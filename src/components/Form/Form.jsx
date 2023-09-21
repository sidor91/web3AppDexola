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
import TransactionStatusHandler from "@/components/TransactionStatusHandler/TransactionStatusHandler.jsx";

function Form({ setAmountToStake }) {
	const [isTransactionStatusShown, setisTransactionStatusShown] =
		useState(false);
	const [buttonTitle, setButtonTitle] = useState("");
	const [placeholder, setPlaceholder] = useState("");
	const [availableAmount, setAvailableAmount] = useState(0);
	const [errorText, setErrorText] = useState(null);
	const { pathname } = useLocation();
	const { BALANCE, REWARDS } = useContractReadData();
	const { struBalance, isConnected } = useAccountAndBalance();
	const {
		stake,
		withdraw,
		claimReward,
		loadingOperation,
		operationAmount,
		isTransactionError,
		isTransactionSuccess,
		isLoading,
		isError,
	} = useTransaction();

	useEffect(() => {
		setisTransactionStatusShown(isError || isTransactionSuccess || isLoading);
	}, [isError, isTransactionSuccess, isLoading]);

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
			switch (pathname) {
				case "/stake":
					await stake(amountToSend);
					break;
				case "/withdraw":
					await withdraw(amountToSend);
					break;
				case "/rewards":
					await claimReward(rewardsAvailableAmount);
			}
		} catch ({ message }) {
			const errorLines = message.split("\n");
			const errorMessage = errorLines[0];
			// setErrorText(errorMessage);
			// console.log(errorMessage);
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
				{isTransactionStatusShown && (
					<TransactionStatusHandler
						pathname={pathname}
						isLoading={isLoading}
						loadingOperation={loadingOperation}
						operationAmount={operationAmount}
						isTransactionSuccess={isTransactionSuccess}
						isTransactionError={isTransactionError}
						isError={isError}
					/>
				)}
			</StyledForm>
		</>
	);
}

export default Form;
