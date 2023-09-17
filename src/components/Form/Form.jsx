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
import { useStake, useWithdraw, useClaimReward, useContractReadOperations } from "@/utils/hooks/useContract";
import useAccountAndBalance from "@/utils/hooks/useAccountAndBalance";
import { parseEther } from "viem";
import { useFormik } from "formik";
import * as Yup from 'yup';

function Form() {
	const [buttonTitle, setButtonTitle] = useState("");
	const [placeholder, setPlaceholder] = useState("");
	const [availableAmount, setAvailableAmount] = useState(0);
	const { pathname } = useLocation();
	const { BALANCE, REWARDS } = useContractReadOperations();
	const { struBalance, isConnected } = useAccountAndBalance();
	const stake = useStake();
	const withdraw = useWithdraw();
	const claimReward = useClaimReward();

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
	}, [pathname, BALANCE, REWARDS, struBalance, isConnected]);

	const initialValues = {
		amount: '',
	}

	const validationSchema = pathname !== '/rewards' && Yup.object({
		amount: Yup.number("amount should be a number").required("required")
	})
	
	const onSubmit = async ({amount}) => {
		const amountToSend = parseEther(amount.toString());

		switch (pathname) {
			case "/stake":
				await stake(amountToSend);
				break;
			case "/withdraw":
				await withdraw(amountToSend);
				break;
			case "/rewards":
				await claimReward();
		}
		formik.handleReset();
	};

	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema
	});

	return (
		<StyledForm onSubmit={formik.handleSubmit}>
			{pathname !== "/rewards" && (
				<Input
					placeholder={placeholder}
					type="number"
					min="1e-18"
					max={availableAmount}
					name="amount"
					onChange={formik.handleChange}
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
		</StyledForm>
	);
}

export default Form;


