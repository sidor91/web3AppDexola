import { useContractRead, useContractWrite } from "wagmi";
import useAccountAndBalance from "@/utils/hooks/useAccountAndBalance";
import { contract, token } from "@/contracts/contracts.js";
const { VITE_STRU_STAKING_CONTRACT } = import.meta.env;

// In this hook defines all the write contract operations and returns write methods. 
// Also, it makes contract read method "allowance" and returns allowance amount, coz it rather belongs to contract write operations than to read ones.

function useContractWriteOperations() {
	const { address, isConnected } = useAccountAndBalance();

	const { data: allowanceAmount } = useContractRead({
		...token,
		functionName: "allowance",
		watch: true,
		args: [address, VITE_STRU_STAKING_CONTRACT],
		enabled: isConnected,
	});

	const { writeAsync: approvalWrite } =
		useContractWrite({
			...token,
			functionName: "approve",
		});

	const { writeAsync: stakeWrite } =
		useContractWrite({
			...contract,
			functionName: "stake",
		});

	const { writeAsync: withdrawWrite } =
		useContractWrite({
			...contract,
			functionName: "withdraw",
		});

	const { writeAsync: exitWrite} = useContractWrite({
		...contract,
		functionName: "exit",
	});

	const { writeAsync: claimRewardWrite } =
		useContractWrite({
			...contract,
			functionName: "claimReward",
		});

	return {
		allowanceAmount,
		approvalWrite,
		stakeWrite,
		withdrawWrite,
		claimRewardWrite,
		exitWrite,
	};
}

export default useContractWriteOperations;
