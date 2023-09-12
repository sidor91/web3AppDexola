import STRUContractAbi from "@/contractABI";
import STRUTokenAbi from "@/tokenABI";
import {
	useContractRead,
	useAccount,
	useContractWrite,
	usePrepareContractWrite,
} from "wagmi";
import { useState, useEffect } from "react";
import { prepareWriteContract } from "@wagmi/core";
const { VITE_STRU_STAKING_CONTRACT, VITE_STRU_TOKEN } = import.meta.env;

function useContract() {
    const [stakingBalance, setStakingBalance] = useState(0);
    const [config, setConfig] = useState({})
	const { address } = useAccount();

	const contract = address && {
		address: VITE_STRU_STAKING_CONTRACT,
		abi: STRUContractAbi,
	};

	const token = address && {
		address: VITE_STRU_TOKEN,
		abi: STRUTokenAbi,
	};

	useContractRead({
		...contract,
		functionName: "balanceOf",
		args: [address],
		watch: true,
		onSuccess(data) {
			const bigIntValue = BigInt(data);
			const numberData = Number(bigIntValue);
			setStakingBalance(numberData);
		},
	});

	const { writeAsync: stakeWrite } = useContractWrite({
		...contract,
		functionName: "stake",
		// onSuccess() {},
	});

	const { writeAsync: approvalWrite, isSuccess: isApprovalSucceess } = useContractWrite({
		...token,
		functionName: "approve",
	});

	return {
		stakingBalance,
		stakeWrite,
		approvalWrite,
		isApprovalSucceess,
	};
}

export default useContract;
