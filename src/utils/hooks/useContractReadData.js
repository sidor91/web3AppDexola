import { useMemo, useState } from "react";
import { formatEther } from "viem";
import { useContractReadOperations } from "./useContractReadOperations";

// This hook receives the data from the useContractRead Operations hook and, using the given formulas, returns values that are needed in the interface
// useMemo was used to reduce the number of re-renders.
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
		} else {
			return 0;
		}
	}, [balanceData]);

	const REWARDS = useMemo(() => {
		if (rewardsData) {
			const value = Number(formatEther(rewardsData));
			const result = value.toFixed(2);
			return result;
		} else {
			return 0;
		}
	}, [rewardsData]);

	const DAYS = useMemo(() => {
		if (daysData) {
			const value = Number(daysData);
			const timeStamp = Date.now() / 1000;
			const daysValue = Math.ceil((value - timeStamp) / 86400);
			return daysValue;
		} else {
			return 0;
		}
	}, [daysData]);

	const APR = useMemo(() => {
		if (rewardForDuration && totalSupply) {
			const result = Math.floor((rewardForDuration * 100) / totalSupply);
			return result;
		} else {
			return 0;
		}
	}, [rewardForDuration, totalSupply]);

		const REWARDRATE = useMemo(() => {
			if (remaining && rewardRateMethodValue && totalSupply) {
				const available = remaining * rewardRateMethodValue;
				const value =
					(Number(BALANCE) * available) / totalSupply + Number(amountToStake);
				return Math.floor(value);
			} else {
				return 0;
			}
		}, [remaining, rewardRateMethodValue, amountToStake, totalSupply, BALANCE]);
	

	return {
		// rewardForDuration,
		// totalSupply,
		// rewardRateMethodValue,
		// remaining,
		// amountToStake,
		setAmountToStake,
		REWARDRATE,
		BALANCE,
		REWARDS,
		DAYS,
		APR,
	};
}

export default useContractReadData;