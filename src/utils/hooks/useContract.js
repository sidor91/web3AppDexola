import STRUContractAbi from "@/contracts/contractABI";
import STRUTokenAbi from "@/contracts/tokenABI";
import { useContractRead, useContractWrite } from "wagmi";
import { waitForTransaction } from "@wagmi/core";
import { formatEther } from "viem";
import { useState, useMemo } from "react";
import useAccountAndBalance from "@/utils/hooks/useAccountAndBalance";
const { VITE_STRU_STAKING_CONTRACT, VITE_STRU_TOKEN } = import.meta.env;

const contract = {
	address: VITE_STRU_STAKING_CONTRACT,
	abi: STRUContractAbi,
};

const token = {
	address: VITE_STRU_TOKEN,
	abi: STRUTokenAbi,
};

export const useStakeOperations = () => {
	const { address, isConnected } = useAccountAndBalance();

	const { data: allowanceAmount } = useContractRead({
		...token,
		functionName: isConnected ? "allowance" : null,
		watch: true,
		args: [address, VITE_STRU_STAKING_CONTRACT],
	});

	const { writeAsync: stakeWrite } = useContractWrite({
		...contract,
		functionName: "stake",
	});

	const { writeAsync: approvalWrite } = useContractWrite({
		...token,
		functionName: "approve",
	});

	const stake = async (value) => {
		const allowance = formatEther(allowanceAmount);
		try {
			if (Number(value) > Number(allowance)) {
				const { hash: approvalHash } = await approvalWrite({
					args: [VITE_STRU_STAKING_CONTRACT, value],
				});
				const { status: approvalStatus } = await waitForTransaction({
					hash: approvalHash,
				});

				if (approvalStatus === "success") {
					const { hash } = await stakeWrite({
						args: [value],
					});
					const transactionData = await waitForTransaction({
						hash,
					});
					console.log(transactionData);
				}
			} else {
				const { hash } = await stakeWrite({
					args: [value],
				});
				const transactionData = await waitForTransaction({
					hash,
				});
				console.log(transactionData);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	const { writeAsync: withdraw } = useContractWrite({
		...contract,
		functionName: "withdraw",
	});

	const withdrawWrite = (value) => {};

	const { writeAsync: claimReward } = useContractWrite({
		...contract,
		functionName: "claimReward",
	});

	return { stake, withdraw, claimReward };
};

export const useContractReadOperations = () => {
	const { address, isConnected } = useAccountAndBalance();

	const [BALANCE, setBALANCE] = useState(0);
	const [DAYS, setDAYS] = useState(0);
	const [REWARDS, setREWARDS] = useState(0);
	const [rewardForDuration, setRewardForDuration] = useState(null);
	const [totalSupply, setTotalSupply] = useState(null);
	const [remaining, setRemaining] = useState(null);
	const [rewardRateMethodValue, setRewardRateMethodValue] = useState(null);

	const APR = useMemo(() => {
		if (rewardForDuration && totalSupply) {
			const result = Math.floor((rewardForDuration * 100) / totalSupply);
			return result;
		}
	}, [rewardForDuration, totalSupply]);

	const REWARDRATE = useMemo(() => {
		if (remaining && rewardRateMethodValue && BALANCE && totalSupply) {
			const available = remaining * rewardRateMethodValue;
			const numberedBalance = Number(BALANCE);
			const value =
				(numberedBalance * available) / totalSupply + numberedBalance;
			return Math.floor(value);
		}
	}, [remaining, rewardRateMethodValue, BALANCE, totalSupply]);
	

	useContractRead({
		...contract,
		functionName: isConnected ? "balanceOf" : null,
		args: [address],
		watch: true,
		onSuccess(data) {
			const value = formatEther(data);
			setBALANCE(Number(value).toFixed(2));
		},
	});

	useContractRead({
		...contract,
		functionName: "rewardRate",
		watch: true,
		onSuccess(data) {
			setRewardRateMethodValue(Number(formatEther(data)));
		},
	});

	useContractRead({
		...contract,
		functionName: "getRewardForDuration",
		watch: true,
		onSuccess(data) {
			const value = Number(formatEther(data));
			setRewardForDuration(value);
		},
	});

	useContractRead({
		...contract,
		functionName: "totalSupply",
		watch: true,
		onSuccess(data) {
			const value = Number(formatEther(data));
			setTotalSupply(value);
		},
	});

	useContractRead({
		...contract,
		functionName: "periodFinish",
		watch: true,
		onSuccess(data) {
			const value = Number(data);
			const timeStamp = Date.now() / 1000;
			const remainingValue = value - timeStamp;
			setRemaining(remainingValue);
			const daysValue = Math.ceil((value - timeStamp) / 86400);
			setDAYS(daysValue);
		},
	});

	useContractRead({
		...contract,
		functionName: isConnected ? "earned" : null,
		args: [address],
		watch: true,
		onSuccess(data) {
			const value = formatEther(data);
			const result = Math.floor(Number(value)).toFixed(2);
			setREWARDS(result);
		},
	});

	return {
		BALANCE,
		REWARDRATE,
		APR,
		DAYS,
		REWARDS,
	};
};
