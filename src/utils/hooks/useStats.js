import useContract from "@/utils/hooks/useContract";
import useAccountAndBalance from "@/utils/hooks/useAccountAndBalance";
import { useState, useEffect } from "react";

function useStats  ()  {
	const [balance, setBalance] = useState(0);
	const [rewardsValue, setRewardsValue] = useState(0);
	const { stakingBalance, APR, DAYS, rewards } = useContract();
	const { isConnected } = useAccountAndBalance();

	useEffect(() => {
		if (isConnected) {
			setBalance(stakingBalance);
			setRewardsValue(rewards);
		} else {
			setBalance(0);
			setRewardsValue(0);
		}
    }, [isConnected, stakingBalance, rewards]);
    
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
};

export default useStats;