import {
	StyledForm,
	Input,
	SubmitButton,
	Label,
	LabelText,
	LabelValue,
	LabelUnits,
} from "./Form.styled";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useTransaction from "@/utils/hooks/useTransaction";
import useAccountAndBalance from "@/utils/hooks/useAccountAndBalance";
import useContractReadData from "@/utils/hooks/useContractReadData";
import { parseEther } from "viem";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loader from "@/components/Loader/Loader.jsx";
import OperationStatusToast from "@/components/Toast/OperationStatusToast.jsx";

function Form({ setAmountToStake }) {
	const [buttonTitle, setButtonTitle] = useState("");
	const [placeholder, setPlaceholder] = useState("");
	const [availableAmount, setAvailableAmount] = useState(0);
	const [operationAmount, setOperationAmount] = useState(0);
	const [isError, setIsError] = useState(false);
	const { pathname } = useLocation();
	const { BALANCE, REWARDS } = useContractReadData();
	const { struBalance, isConnected } = useAccountAndBalance();
	const {
		stake,
		withdraw,
		claimReward,
		// loadingOperation,
		// operationAmount,
		isTransactionSuccess,
		isLoading,
		isApprovalTransactionLoading,
		// isError,
	} = useTransaction();

	useEffect(() => {
		switch (pathname) {
			case "/stake":
				setButtonTitle("Stake");
				setAvailableAmount(() => (isConnected ? struBalance : 0));
				setPlaceholder("Enter stake amount");
				break;
			case "/withdraw":
				setButtonTitle("Withdraw");
				setAvailableAmount(() => (isConnected ? BALANCE : 0));
				setPlaceholder("Enter withdraw amount");
				break;
			case "/rewards":
				setButtonTitle("claim rewards");
				setAvailableAmount(() => (isConnected ? REWARDS : 0));
		}
	}, [pathname, isConnected, struBalance, BALANCE, REWARDS]);
	

	const validationSchema =
		pathname !== "/rewards" &&
		Yup.object({
			amount: Yup.number("amount should be a number").required("required"),
		});

	const onSubmit = async ({ amount }) => {
		const amountToSend = parseEther(amount.toString());
		const rewardsAvailableAmount = parseEther(availableAmount.toString());
		try {
			setIsError(false);
			switch (pathname) {
				case "/stake":
					setOperationAmount(amountToSend);
					await stake(amountToSend);
					break;
				case "/withdraw":
					setOperationAmount(amountToSend);
					await withdraw(amountToSend);
					break;
				case "/rewards":
					setOperationAmount(rewardsAvailableAmount);
					await claimReward(rewardsAvailableAmount);
			}
		} catch ({ message }) {
			setIsError(true);
			const errorLines = message.split("\n");
			const errorMessage = errorLines[0];
			console.log(errorMessage);
		}

		formik.handleReset();
		setAmountToStake(0);
	};

	const formik = useFormik({
		initialValues: {
			amount: "",
		},
		onSubmit,
		validationSchema,
	});

	return (
		<>
			<StyledForm onSubmit={formik.handleSubmit}>
				{pathname !== "/rewards" && (
					<Input
						placeholder={placeholder}
						type="number"
						min="1e-18"
						max={availableAmount}
						name="amount"
						onChange={(e) => {
							formik.handleChange(e);
							setAmountToStake(e.target.value);
						}}
						value={formik.values.amount}
						onBlur={formik.handleBlur}
					/>
				)}
				<Label>
					<LabelText>Available:</LabelText>
					<LabelValue>{availableAmount}</LabelValue>
					<LabelUnits>STRU</LabelUnits>
				</Label>
				<SubmitButton type="submit">{buttonTitle}</SubmitButton>
				{isLoading &&
					!isError && (
						<Loader
							pathname={pathname}
							isApprovalLoading={isApprovalTransactionLoading}
							operationAmount={operationAmount}
						/>
					)}
				{(isTransactionSuccess || isError) && (
					<OperationStatusToast
						isError={isError}
						isTransactionSuccess={isTransactionSuccess}
						pathname={pathname}
						operationAmount={operationAmount}
					/>
				)}
			</StyledForm>
		</>
	);
}

export default Form;
