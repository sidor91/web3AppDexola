import { useLocation } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
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
	const [transactionType, setTransactionType] = useState('');
	const [isError, setIsError] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { pathname } = useLocation();
	const { BALANCE, REWARDS } = useContractReadData();
	const { struBalance } = useAccountAndBalance();
	const dimensions = useWindowDimensions();
	const { stake, withdraw, claimReward, exit, isApprovalTransactionLoading } =
		useTransaction();

	// Depending on pathname we set button text, available amount and input placeholder.
	useEffect(() => {
		switch (pathname) {
			case "/stake":
				setButtonTitle("Stake");
				setAvailableAmount(struBalance);
				setPlaceholder("Enter stake amount");
				break;
			case "/withdraw":
				setButtonTitle("Withdraw");
				setAvailableAmount(BALANCE);
				setPlaceholder("Enter withdraw amount");
				break;
			case "/rewards":
				setButtonTitle("claim rewards");
				setAvailableAmount(REWARDS);
		}
	}, [pathname, struBalance, BALANCE, REWARDS]);

	// For claim rewards page we don't need a validation Schema because of absence of input. 
	// For "exit" operation we don't need it as well coz this transaction doesn't require any value from input.
	const validationSchema = useMemo(() => {
		if (pathname !== "/rewards" && transactionType !== "exit") {
			return Yup.object({
				amount: Yup.number("Amount should be a number")
					.min(
						0.000000000000000001,
						"The minimum amount is 0.000000000000000001"
					)
					.max(availableAmount, `The maximum amount is ${availableAmount}`)
					.required("Required"),
			});
		} else {
			return null;
		}
	}, [pathname, transactionType, availableAmount]);
		

	const onSubmit = async ({ amount }) => {
		const amountToSend = parseEther(amount.toString());
		const rewardsAvailableAmount = parseEther(availableAmount.toString());
		setIsLoading(true);
		setIsError(false);
		setIsSuccess(false);
		try {
			if (pathname === "/stake") {
				setTransactionType('stake')
				setTransactionAmount(amountToSend);
				const response = await stake(amountToSend);
				response && setIsLoading(false);
			} else if (pathname === "/withdraw" && transactionType !== 'exit') {
				setTransactionType("withdraw");
				setTransactionAmount(amountToSend);
				const response = await withdraw(amountToSend);
				response && setIsLoading(false);
			} else if (transactionType === 'exit') {
				const response = await exit();
				response && setIsLoading(false);
			} else if (pathname === "/rewards") {
				setTransactionType("rewards");
				setTransactionAmount(rewardsAvailableAmount);
				const response = await claimReward();
				response && setIsLoading(false);
			}
			setIsSuccess(true);
		} catch ({message}) {
			setIsLoading(false);
			setIsError(true);
			const errorLines = message.split("\n");
			const errorMessage = `${errorLines[0]} ${errorLines[1]}`;
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
				<Label $isrewardspage={pathname === "/rewards"}>
					<LabelText>Available:</LabelText>
					<LabelValue>{availableAmount}</LabelValue>
					<LabelUnits>STRU</LabelUnits>
				</Label>
				<SubmitButtonContainer>
					<SubmitButton
						type="submit"
						onClick={() => {
							setTransactionType("");
						}}
						disabled={isLoading}
					>
						{buttonTitle}
					</SubmitButton>
					{dimensions >= 1440 && pathname === "/withdraw" && (
						<ExitButton
							type="submit"
							onClick={() => {
								setTransactionType("exit");
							}}
							disabled={isLoading}
						>
							withdraw all & Claim rewards
						</ExitButton>
					)}
				</SubmitButtonContainer>
			</StyledForm>
			<OperationStatusContainer>
				{isLoading && (
					<Loader
						transactionType={transactionType}
						isApprovalLoading={isApprovalTransactionLoading}
						transactionAmount={transactionAmount}
					/>
				)}
				{(isSuccess || isError) && !isLoading && (
					<OperationStatusToast
						isTransactionSuccess={isSuccess}
						setIsSuccess={setIsSuccess}
						isError={isError}
						setIsError={setIsError}
						transactionType={transactionType}
						transactionAmount={transactionAmount}
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
