import useAccountAndBalance from "@/utils/hooks/useAccountAndBalance";
import { useState, useEffect } from "react";
import { useContractReadOperations } from "@/utils/hooks/useContract";

function useStats() {
	const [balance, setBalance] = useState(0);
	const [rewardsValue, setRewardsValue] = useState(0);
	const { BALANCE, APR, DAYS, REWARDS } = useContractReadOperations();
	const { isConnected } = useAccountAndBalance();

	useEffect(() => {
		if (isConnected) {
			setBalance(BALANCE);
			setRewardsValue(REWARDS);
		} else {
			setBalance(0);
			setRewardsValue(0);
		}
	}, [isConnected, BALANCE, REWARDS]);

	const statsArray = [
		{
			value: balance,
			units: "stru",
			description: "Staked balance",
			helperText: "Staking rewards get allocated on this sum",
		},
		{
			value: `≈${APR}%`,
			units: "",
			description: "APR",
			helperText:
				"Displays the average for APR. Interest rate is calculated for each amount of tokens.",
		},
		{
			value: DAYS,
			units: "",
			description: "Days",
			helperText: "",
		},
		{
			value: rewardsValue,
			units: "stru",
			description: "Rewards",
			helperText: "Rewards get allocated every second",
		},
	];

	return statsArray;
}

export default useStats;
