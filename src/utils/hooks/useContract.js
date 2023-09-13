import STRUContractAbi from "@/contractABI";
import STRUTokenAbi from "@/tokenABI";
import {
	useContractRead,
	useAccount,
	useContractWrite,
} from "wagmi";
import { formatEther } from "viem";
import { useState, useEffect } from "react";
const { VITE_STRU_STAKING_CONTRACT, VITE_STRU_TOKEN } = import.meta.env;

function useContract() {
    const [stakingBalance, setStakingBalance] = useState(0);
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
            const value = formatEther(data);
					setStakingBalance(Number(value).toFixed(2));
				},
	});

	const { writeAsync: stakeWrite } = useContractWrite({
		...contract,
		functionName: "stake",
	});

	const { writeAsync: approvalWrite } = useContractWrite({
		...token,
        functionName: "approve",
    });
    
    const { data: allowanceAmount } = useContractRead({
			...token,
			functionName: "allowance",
			watch: true,
			args: [address, VITE_STRU_STAKING_CONTRACT],
		});

	return {
		stakingBalance,
		stakeWrite,
		approvalWrite,
		allowanceAmount,
	};
}

export default useContract;
