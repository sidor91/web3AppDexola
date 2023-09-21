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
		isApprovalError,
		isStakeError,
		isWithDrawError,
		isClaimRewardError,
	} = useContractWriteOperations();
	const [hash, setHash] = useState(null);
	const [isApprovalTransactionLoading, setIsApprovalTransactionLoading] =
		useState(false);

	const {
		isError: isTransactionError,
		isSuccess: isTransactionSuccess,
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
			isTransactionLoading,
		[
			isApprovalLoading,
			isApprovalTransactionLoading,
			isStakeLoading,
			isWithdrawLoading,
			isClaimRewardsLoading,
			isTransactionLoading,
		]
	);

	const isError = useMemo(
		() =>
			isApprovalError ||
			isStakeError ||
			isWithDrawError ||
			isClaimRewardError ||
			isTransactionError,
		[
			isApprovalError,
			isStakeError,
			isWithDrawError,
			isClaimRewardError,
			isTransactionError,
		]
	);

	const stake = async (value) => {
		const allowance = formatEther(allowanceAmount);
		if (Number(value) > Number(allowance)) {
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

	return {
		isTransactionError,
		isTransactionSuccess,
		isLoading,
		isApprovalTransactionLoading,
		isError,
		stake,
		withdraw,
		claimReward,
	};
}

export default useTransaction;
