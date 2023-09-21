import { useMemo, useState } from "react";
import { formatEther } from "viem";
import { useContractReadOperations } from "./useContractReadOperations";

function useContractReadData() {
	const {
		balanceData,
		daysData,
		rewardsData,
		rewardRateMethodData,
		rewardForDurationData,
		totalSupplyData,
	} = useContractReadOperations();
		const [amountToStake, setAmountToStake] = useState(0);

	const rewardForDuration = useMemo(() => {
		if (rewardForDurationData) {
			const value = Number(formatEther(rewardForDurationData));
			return value;
		}
	}, [rewardForDurationData]);

	const totalSupply = useMemo(() => {
		if (totalSupplyData) {
			const value = Number(formatEther(totalSupplyData));
			return value;
		}
	}, [totalSupplyData]);

	const rewardRateMethodValue = useMemo(
		() => {
			if (rewardRateMethodData) {
				return Number(formatEther(rewardRateMethodData));
			}
		},
		[rewardRateMethodData]
	);

	const remaining = useMemo(() => {
		if (daysData) {
			const value = Number(daysData);
			const timeStamp = Date.now() / 1000;
			const remainingValue = value - timeStamp;
			return remainingValue;
		}
	}, [daysData]);

	const BALANCE = useMemo(() => {
		if (balanceData) {
			const value = Number(formatEther(balanceData));
			return value.toFixed(2);
		}
	}, [balanceData]);

	const REWARDS = useMemo(() => {
		if (rewardsData) {
			const value = Number(formatEther(rewardsData));
			const result = value.toFixed(2);
			return result;
		}
	}, [rewardsData]);

	const DAYS = useMemo(() => {
		if (daysData) {
			const value = Number(daysData);
			const timeStamp = Date.now() / 1000;
			const daysValue = Math.ceil((value - timeStamp) / 86400);
			return daysValue;
		}
	}, [daysData]);

	const APR = useMemo(() => {
		if (rewardForDuration && totalSupply) {
			const result = Math.floor((rewardForDuration * 100) / totalSupply);
			return result;
		}
	}, [rewardForDuration, totalSupply]);

		const REWARDRATE = useMemo(() => {
			if (
				remaining &&
				rewardRateMethodValue &&
				totalSupply &&
				BALANCE
			) {
				const available = remaining * rewardRateMethodValue;
				const value =
					(Number(BALANCE) * available) / totalSupply + Number(amountToStake);
				return Math.floor(value);
			}
		}, [remaining, rewardRateMethodValue, amountToStake, totalSupply, BALANCE]);
	

	return {
		rewardForDuration,
		totalSupply,
		rewardRateMethodValue,
		remaining,
		amountToStake,
		setAmountToStake,
		REWARDRATE,
		BALANCE,
		REWARDS,
		DAYS,
		APR,
	};
}

export default useContractReadData;