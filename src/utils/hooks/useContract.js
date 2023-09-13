import STRUContractAbi from "@/contractABI";
import STRUTokenAbi from "@/tokenABI";
import { useContractRead, useAccount, useContractWrite } from "wagmi";
import { waitForTransaction } from "@wagmi/core";
import { formatEther, parseEther } from "viem";
import { useState, useMemo, useEffect } from "react";
const { VITE_STRU_STAKING_CONTRACT, VITE_STRU_TOKEN } = import.meta.env;

const contract = {
	address: VITE_STRU_STAKING_CONTRACT,
	abi: STRUContractAbi,
};

function useContract() {
	const [stakingBalance, setStakingBalance] = useState(0);
	const [rewardForDuration, setRewardForDuration] = useState(null);
	const [totalSupply, setTotalSupply] = useState(null);
	const [DAYS, setDAYS] = useState(0);
	const [APR, setApr] = useState(0);
	const [rewards, setRewards] = useState(0)
	const { address } = useAccount();

	useEffect(() => {
		if (rewardForDuration && totalSupply) {
			const result = Math.floor((rewardForDuration * 100) / totalSupply);
			setApr(result);
		}
	}, [rewardForDuration, totalSupply]);

	const token = address && {
		address: VITE_STRU_TOKEN,
		abi: STRUTokenAbi,
	};

	useContractRead({
		...contract,
		functionName: address ? "balanceOf" : null,
		args: [address],
		watch: true,
		// account: "0x99824818480d6178b1f5d9DA6A42810Ea97edDE4",
		onSuccess(data) {
			const value = formatEther(data);
			setStakingBalance(Math.floor(Number(value)));
		},
	});

	const { data: allowanceAmount } = useContractRead({
		...token,
		functionName: "allowance",
		watch: true,
		args: [address, VITE_STRU_STAKING_CONTRACT],
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
			const result = Math.floor((value - timeStamp) / 86400);
			setDAYS(result);
		},
	});

	useContractRead({
		...contract,
		functionName: address ? "earned" : null,
	args: [address],
		watch: true,
		onSuccess(data) {
			const value = (formatEther(data));
			const result = Math.floor(Number(value));
			setRewards(result)
		},
	});
	
	// ///////////////////////////////////////////

	const { writeAsync: stakeWrite } = useContractWrite({
		...contract,
		functionName: "stake",
	});

	const { writeAsync: approvalWrite } = useContractWrite({
		...token,
		functionName: "approve",
	});

	const stake = async (value) => {
		const amountToSend = parseEther(value);
		const allowance = formatEther(allowanceAmount);
		try {
			if (Number(value) > Number(allowance)) {
				const { hash: approvalHash } = await approvalWrite({
					args: [VITE_STRU_STAKING_CONTRACT, amountToSend],
				});
				const { status: approvalStatus } = await waitForTransaction({
					hash: approvalHash,
				});

				if (approvalStatus === "success") {
					const { hash } = await stakeWrite({
						args: [amountToSend],
					});
					const transactionData = await waitForTransaction({
						hash,
					});
					console.log(transactionData);
				}
			} else {
				const { hash } = await stakeWrite({
					args: [amountToSend],
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

	return {
		stakingBalance,
		stakeWrite,
		approvalWrite,
		allowanceAmount,
		stake,
		APR,
		DAYS,
		rewards,
	};
}

export default useContract;
