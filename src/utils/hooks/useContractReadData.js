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
		const [amountToStake, setAmountToStake] = useState(null);

	const rewardForDuration = useMemo(() => {
		const value = Number(formatEther(rewardForDurationData));
		return value;
	}, [rewardForDurationData]);

	const totalSupply = useMemo(() => {
		const value = Number(formatEther(totalSupplyData));
		return value;
	}, [totalSupplyData]);

	const rewardRateMethodValue = useMemo(
		() => Number(formatEther(rewardRateMethodData)),
		[rewardRateMethodData]
	);

	const remaining = useMemo(() => {
		const value = Number(daysData);
		const timeStamp = Date.now() / 1000;
		const remainingValue = value - timeStamp;
		return remainingValue;
	}, [daysData]);

	const BALANCE = useMemo(() => {
		if (balanceData) {
			const value = formatEther(balanceData);
			return Number(value).toFixed(2);
		}
	}, [balanceData]);

	const REWARDS = useMemo(() => {
		if (rewardsData) {
			const value = formatEther(rewardsData);
			const result = Math.floor(Number(value)).toFixed(2);
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
			if (remaining && rewardRateMethodValue && amountToStake && totalSupply) {
				const available = remaining * rewardRateMethodValue;
				const value =
					(Number(amountToStake) * available) / totalSupply +
					Number(amountToStake);
				return Math.floor(value);
			}
		}, [remaining, rewardRateMethodValue, amountToStake, totalSupply]);
	

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