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
import { useState, useEffect, useRef } from "react";
import {
	useStakeOperations,
	useContractReadOperations,
} from "@/utils/hooks/useContract";
import useAccountAndBalance from "@/utils/hooks/useAccountAndBalance";
import {  parseEther } from "viem";

function Form() {
	const [buttonTitle, setButtonTitle] = useState("");
	const [placeholder, setPlaceholder] = useState("");
	const [availableAmount, setAvailableAmount] = useState(0);
	const { pathname } = useLocation();
	const { BALANCE, REWARDS } = useContractReadOperations();
	const { struBalance, isConnected } = useAccountAndBalance();
	const { withdraw, stake, claimReward } = useStakeOperations();
	const formRef = useRef(null);

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

	
	const handleSubmit = async (data) => {
		data.preventDefault();
		const { value } = data.currentTarget[0];
		const amountToSend = parseEther(value);

		switch (pathname) {
			case "/stake":
				await stake(amountToSend);
				break;
			case "/withdraw":
				await withdraw({ args: [amountToSend] });
				break;
			case "/rewards":
				await claimReward();
		}

		formRef.current.reset();
	};

	return (
		<StyledForm onSubmit={handleSubmit} ref={formRef}>
			{pathname !== "/rewards" && <Input placeholder={placeholder} />}
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


