import {
	StyledForm,
	Input,
	SubmitButton,
	Label,
	LabelText,
	LabelValue,
	LabelUnits,
	OperationStatusContainer,
	InputContainer,
	InputErrorMessage,
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
	const [isSuccess, setIsSuccess] = useState(false);
	const { pathname } = useLocation();
	const { BALANCE, REWARDS } = useContractReadData();
	const { struBalance, isConnected } = useAccountAndBalance();
	const {
		stake,
		withdraw,
		claimReward,
		isTransactionSuccess,
		isLoading,
		isApprovalTransactionLoading,
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
			amount: Yup.number("amount should be a number")
				.min(0.000000000000000001, "The minimum amount is 0.000000000000000001")
				.max(availableAmount, `The maximum amount is ${availableAmount}`)
				.required("required"),
		});

	const onSubmit = async ({ amount }) => {
		const amountToSend = parseEther(amount.toString());
		const rewardsAvailableAmount = parseEther(availableAmount.toString());
		try {
			setIsError(false);
			setIsSuccess(false);
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
			setIsSuccess(true);
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

	const inputError = formik.touched.amount && formik.errors.amount && formik.errors.amount !== 'required';

	return (
		<>
			<StyledForm onSubmit={formik.handleSubmit}>
				{pathname !== "/rewards" && (
					<InputContainer>
						<Input
							placeholder={placeholder}
							type="number"
							name="amount"
							onChange={(e) => {
								formik.handleChange(e);
								setAmountToStake(e.target.value);
							}}
							value={formik.values.amount}
							onBlur={formik.handleBlur}
							$iserror={inputError}
						/>
						{inputError && (
							<InputErrorMessage>{formik.errors.amount}</InputErrorMessage>
						)}
					</InputContainer>
				)}
				<Label>
					<LabelText>Available:</LabelText>
					<LabelValue>{availableAmount}</LabelValue>
					<LabelUnits>STRU</LabelUnits>
				</Label>
				<SubmitButton type="submit">{buttonTitle}</SubmitButton>
			</StyledForm>
			<OperationStatusContainer>
				{isLoading && !isError && (
					<Loader
						pathname={pathname}
						isApprovalLoading={isApprovalTransactionLoading}
						operationAmount={operationAmount}
					/>
				)}
				{(isTransactionSuccess || isError) && !isLoading && (
					<OperationStatusToast
						isError={isError}
						isTransactionSuccess={isSuccess}
						pathname={pathname}
						operationAmount={operationAmount}
						setIsSuccess={setIsSuccess}
						setIsError={setIsError}
					/>
				)}
			</OperationStatusContainer>
		</>
	);
}

export default Form;
