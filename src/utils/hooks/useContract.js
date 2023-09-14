import STRUContractAbi from "@/contracts/contractABI";
import STRUTokenAbi from "@/contracts/tokenABI";
import { useContractRead, useContractWrite } from "wagmi";
import { waitForTransaction } from "@wagmi/core";
import { formatEther, parseEther } from "viem";
import { useState, useEffect } from "react";
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

function useContract() {
	const [BALANCE, setBALANCE] = useState(0);
	const [DAYS, setDAYS] = useState(0);
	const [APR, setApr] = useState(0);
	const [REWARDS, setREWARDS] = useState(0);
	const [REWARDRATE, setREWARDRATE] = useState(0);
	const [rewardForDuration, setRewardForDuration] = useState(null);
	const [totalSupply, setTotalSupply] = useState(null);
	const [remaining, setRemaining] = useState(null);
	const [rewardRateMethodValue, setRewardRateMethodValue] = useState(null);
	
	const { address } = useAccountAndBalance();

	useEffect(() => {
		if (rewardForDuration && totalSupply) {
			const result = Math.floor((rewardForDuration * 100) / totalSupply);
			setApr(result);
		}
	}, [rewardForDuration, totalSupply]);

	useEffect(() => {
		if (remaining && rewardRateMethodValue && BALANCE && totalSupply) {
			const available = remaining * rewardRateMethodValue;
			const numberedBalance = Number(BALANCE);
			const value =
				(numberedBalance * available) / totalSupply + numberedBalance;
			setREWARDRATE(Math.floor(value));
		}
	}, [remaining, rewardRateMethodValue, BALANCE, totalSupply]);

	useContractRead({
		...contract,
		functionName: address ? "balanceOf" : null,
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
		}
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
		functionName: address ? "earned" : null,
	    args: [address],
		watch: true,
		onSuccess(data) {
			const value = (formatEther(data));
			const result = Math.floor(Number(value)).toFixed(2);
			setREWARDS(result);
		},
	});
	
// /////////////////////////////////////////////////////////
// Functions related to stake method 
	
	const { data: allowanceAmount } = useContractRead({
		...token,
		functionName: address ? "allowance" : null,
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
			const amountToSend = parseEther(value);

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
// //////////////////////////////////////////
	
	const { writeAsync: withdraw } = useContractWrite({
		...contract,
		functionName: "withdraw",
	});

	const { writeAsync: claimReward } = useContractWrite({
		...contract,
		functionName: "claimReward",
	});
	
	
	return {
		BALANCE,
		REWARDRATE,
		APR,
		DAYS,
		REWARDS,
		stake,
		withdraw,
		claimReward,
	};
}

export default useContract;
