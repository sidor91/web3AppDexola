import useContractWriteOperations from "./useContractWriteOperations";
import { useWaitForTransaction } from "wagmi";
import { waitForTransaction } from "@wagmi/core";
import { useState, useMemo } from "react";
import { formatEther } from "viem";
const { VITE_STRU_STAKING_CONTRACT } = import.meta.env;

function useTransaction() {
	const {
		allowanceAmount,
		approvalWrite,
		isApprovalLoading,
		stakeWrite,
		isStakeLoading,
		withdrawWrite,
		isWithdrawLoading,
		claimRewardWrite,
		isClaimRewardsLoading,
		exitWrite,
		isExitLoading,
	} = useContractWriteOperations();
	const [hash, setHash] = useState(null);
	const [isApprovalTransactionLoading, setIsApprovalTransactionLoading] =
		useState(false);

	const {
		isLoading: isTransactionLoading,
	} = useWaitForTransaction({
		hash,
	});

	const isLoading = useMemo(
		() =>
			isApprovalLoading ||
			isApprovalTransactionLoading ||
			isStakeLoading ||
			isWithdrawLoading ||
			isClaimRewardsLoading ||
			isTransactionLoading ||
			isExitLoading,
		[
			isApprovalLoading,
			isApprovalTransactionLoading,
			isStakeLoading,
			isWithdrawLoading,
			isClaimRewardsLoading,
			isTransactionLoading,
			isExitLoading,
		]
	);

	const stake = async (value) => {
		const allowance = Number(formatEther(allowanceAmount));
		
		if (Number(formatEther(value)) > allowance) {
			setIsApprovalTransactionLoading(true);
			const { hash: approvalHash } = await approvalWrite({
				args: [VITE_STRU_STAKING_CONTRACT, value],
			});
			const { status: approvalStatus } = await waitForTransaction({
				hash: approvalHash,
			});
			approvalStatus && setIsApprovalTransactionLoading(false);
			if (approvalStatus === "success") {
				const { hash: stakeHash } = await stakeWrite({
					args: [value],
				});
				setHash(stakeHash);
			}
		} else {
			const { hash: stakeHash } = await stakeWrite({
				args: [value],
			});

			setHash(stakeHash);
		}
	};

	const withdraw = async (value) => {
		const { hash } = await withdrawWrite({
			args: [value],
		});
		setHash(hash);
	};

	const claimReward = async () => {
		const { hash } = await claimRewardWrite();
		setHash(hash);
	};

	const exit = async () => {
		const { hash } = await exitWrite();
		setHash(hash);
	};

	return {
		isLoading,
		isApprovalTransactionLoading,
		stake,
		withdraw,
		claimReward,
		exit,
	};
}

export default useTransaction;
