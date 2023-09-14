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
import useContract, { useStakeOperations } from "@/utils/hooks/useContract";
import useAccountAndBalance from "@/utils/hooks/useAccountAndBalance";


function Form() {
	const [buttonTitle, setButtonTitle] = useState("");
	const [placeholder, setPlaceholder] = useState("");
	const [availableAmount, setAvailableAmount] = useState(0);
	const { pathname } = useLocation();
	const { BALANCE, REWARDS } = useContract();
	const { struBalance } = useAccountAndBalance();
	const { withdraw, stake, claimReward } = useStakeOperations();

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
				setPlaceholder("Enter stake amount");
		}
	}, [pathname]);

	const formRef = useRef(null);

	const handleSubmit = async (data) => {
		data.preventDefault();
		const { value } = data.currentTarget[0];
        await stake(value);
		// const amount = parseEther("1");
		// const response = await withdraw({ args: [amount] });
		// console.log(response);

	    // const claimRewardsData = await claimReward();
	    // console.log(claimRewardsData);

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


