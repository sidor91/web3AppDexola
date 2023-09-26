import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { parseEther } from "viem";
import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import useWindowDimensions from "@/utils/hooks/useWindowDimensions.js";
import useTransaction from "@/utils/hooks/useTransaction";
import useAccountAndBalance from "@/utils/hooks/useAccountAndBalance";
import useContractReadData from "@/utils/hooks/useContractReadData";
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
	ExitButton,
	SubmitButtonContainer,
} from "./Form.styled";
import Loader from "@/components/Loader/Loader.jsx";
import OperationStatusToast from "@/components/Toast/OperationStatusToast.jsx";

function Form({ setAmountToStake }) {
	const [buttonTitle, setButtonTitle] = useState("");
	const [placeholder, setPlaceholder] = useState("");
	const [availableAmount, setAvailableAmount] = useState(0);
	const [transactionAmount, setTransactionAmount] = useState(0);
	const [isError, setIsError] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isExitOperation, setIsExitOperation] = useState(false);
	const { pathname } = useLocation();
	const { BALANCE, REWARDS } = useContractReadData();
	const { struBalance, isConnected } = useAccountAndBalance();
	const dimensions = useWindowDimensions();
	const { stake, withdraw, claimReward, exit, isApprovalTransactionLoading } =
		useTransaction();

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
			amount: Yup.number("Amount should be a number")
				.min(0.000000000000000001, "The minimum amount is 0.000000000000000001")
				.max(availableAmount, `The maximum amount is ${availableAmount}`)
				.required("Required"),
		});

	const onSubmit = async ({ amount }) => {
		const amountToSend = parseEther(amount.toString());
		const rewardsAvailableAmount = parseEther(availableAmount.toString());
		try {
			setIsLoading(true);
			setIsError(false);
			setIsSuccess(false);
			setIsExitOperation(false);
			switch (pathname) {
				case "/stake":
					setTransactionAmount(amountToSend);
					const stakeResponse = await stake(amountToSend);
					stakeResponse && setIsLoading(false);
					break;
				case "/withdraw":
					setTransactionAmount(amountToSend);
					const withdrawResponse = await withdraw(amountToSend);
					withdrawResponse && setIsLoading(false);
					break;
				case "/rewards":
					setTransactionAmount(rewardsAvailableAmount);
					const claimRewardsResponse = await claimReward(
						rewardsAvailableAmount
					);
					claimRewardsResponse && setIsLoading(false);
			}
			setIsSuccess(true);
		} catch ({ message }) {
			setIsLoading(false);
			setIsError(true);
			const errorLines = message.split("\n");
			const errorMessage = errorLines[0];
			console.log(errorMessage);
		}

		formik.handleReset();
		setAmountToStake(0);
	};

	const onExit = async () => {
		try {
			setIsExitOperation(true);
			setIsLoading(true);
			setIsError(false);
			setIsSuccess(false);
			const response = await exit();
			response && setIsLoading(false);
			setIsSuccess(true);
		} catch ({ message }) {
			setIsLoading(false);
			setIsError(true);
			setIsExitOperation(false);
			const errorLines = message.split("\n");
			const errorMessage = errorLines[0];
			console.log(errorMessage);
		}
	};

	const formik = useFormik({
		initialValues: {
			amount: "",
		},
		onSubmit,
		validationSchema,
	});

	const inputError = formik.touched.amount && formik.errors.amount;
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
				<SubmitButtonContainer>
					<SubmitButton type="submit">{buttonTitle}</SubmitButton>
					{dimensions >= 1440 && pathname === "/withdraw" && (
						<ExitButton type="button" onClick={onExit}>
							withdraw all & Claim rewards
						</ExitButton>
					)}
				</SubmitButtonContainer>
			</StyledForm>
			<OperationStatusContainer>
				{isLoading && !isError && (
					<Loader
						pathname={pathname}
						isApprovalLoading={isApprovalTransactionLoading}
						transactionAmount={transactionAmount}
						isExitOperation={isExitOperation}
					/>
				)}
				{(isSuccess || isError) && !isLoading && (
					<OperationStatusToast
						isTransactionSuccess={isSuccess}
						setIsSuccess={setIsSuccess}
						isError={isError}
						setIsError={setIsError}
						pathname={pathname}
						transactionAmount={transactionAmount}
						isExitOperation={isExitOperation}
						setIsExitOperation={setIsExitOperation}
					/>
				)}
			</OperationStatusContainer>
		</>
	);
}

export default Form;

Form.propTypes = {
	setAmountToStake: PropTypes.func,
};
