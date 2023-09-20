import {
	useContractRead,
	useContractWrite,
} from "wagmi";
import useAccountAndBalance from "@/utils/hooks/useAccountAndBalance";
import { contract, token } from "@/contracts/contracts.js";
const { VITE_STRU_STAKING_CONTRACT } = import.meta.env;

function useContractWriteOperations () {
	const { address, isConnected } = useAccountAndBalance();

	const { data: allowanceAmount, isLoading: isAllowanceLoading } =
		useContractRead({
			...token,
			functionName: "allowance",
			watch: true,
			args: [address, VITE_STRU_STAKING_CONTRACT],
			enabled: isConnected,
		});

	const { writeAsync: approvalWrite, isLoading: isApprovalLoading } =
		useContractWrite({
			...token,
			functionName: "approve",
		});

	const { writeAsync: stakeWrite, isLoading: isStakeLoading } =
		useContractWrite({
			...contract,
			functionName: "stake",
		});

	const { writeAsync: withdrawWrite, isLoading: isWithdrawLoading } =
		useContractWrite({
			...contract,
			functionName: "withdraw",
		});
	const { writeAsync: claimRewardWrite, isLoading: isClaimRewardsLoading } =
		useContractWrite({
			...contract,
			functionName: "claimReward",
		});

	return {
		allowanceAmount,
		isAllowanceLoading,
		approvalWrite,
		isApprovalLoading,
		stakeWrite,
		isStakeLoading,
		withdrawWrite,
		isWithdrawLoading,
		claimRewardWrite,
		isClaimRewardsLoading,
	};
};

export default useContractWriteOperations;
