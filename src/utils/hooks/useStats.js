import useAccountAndBalance from "@/utils/hooks/useAccountAndBalance";
import { useState, useEffect, useMemo } from "react";
import useContractReadData from "@/utils/hooks/useContractReadData";
import { formatEther } from "viem";

function useStats() {
	const [balance, setBalance] = useState(0);
	const [rewardsValue, setRewardsValue] = useState(0);
	const { BALANCE, REWARDS, DAYS, APR } = useContractReadData();
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
			value: `≈${APR || 0}%`,
			units: "",
			description: "APR",
			helperText:
				"Displays the average for APR. Interest rate is calculated for each amount of tokens.",
		},
		{
			value: `${DAYS || 0}`,
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

	return { statsArray, BALANCE, REWARDS };
}

export default useStats;
