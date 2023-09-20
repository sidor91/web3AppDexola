import useContractWriteOperations from "./useContractWriteOperations";
import { useWaitForTransaction } from "wagmi";
import { waitForTransaction } from "@wagmi/core";
import { useState,useMemo } from "react";
import { formatEther } from "viem";
const { VITE_STRU_STAKING_CONTRACT } = import.meta.env;

function useTransaction() {
	const {
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
	} = useContractWriteOperations();
	const [loadingOperation, setLoadingOperation] = useState("");
	const [hash, setHash] = useState(null);

	const {
		isError: isTransactionError,
		isSuccess: isTransactionSuccess,
		isLoading: isTransactionLoading,
	} = useWaitForTransaction({
		hash,
		onSettled() {
			setLoadingOperation("");
		},
	});

	const stake = async (value) => {
		const allowance = formatEther(allowanceAmount);
		if (Number(value) > Number(allowance)) {
			setLoadingOperation("Approving");
			const { hash: approvalHash } = await approvalWrite({
				args: [VITE_STRU_STAKING_CONTRACT, value],
			});
			setHash(approvalHash);
			const { status: approvalStatus } = await waitForTransaction({
				hash: approvalHash,
			});
			if (approvalStatus === "success") {
				setLoadingOperation("Adding");
				const { hash: stakeHash } = await stakeWrite({
					args: [value],
				});
				setHash(stakeHash);
			}
		} else {
			setLoadingOperation("Adding");
			const { hash: stakeHash } = await stakeWrite({
				args: [value],
			});

			setHash(stakeHash);
		}
	};

	const withdraw = async (value) => {
		setLoadingOperation("Withdraw");
		const { hash } = await withdrawWrite({
			args: [value],
		});
		setHash(hash);
	};

	const claimReward = async () => {
		setLoadingOperation("Claiming Rewards");
		const { hash } = await claimRewardWrite();
		setHash(hash);
	};

	const isLoading = useMemo(
		() =>
			isAllowanceLoading ||
			isApprovalLoading ||
			isStakeLoading ||
			isWithdrawLoading ||
			isClaimRewardsLoading ||
			isTransactionLoading,
		[
			isAllowanceLoading,
			isApprovalLoading,
			isStakeLoading,
			isWithdrawLoading,
			isClaimRewardsLoading,
			isTransactionLoading,
		]
	);

	return {
		isTransactionError,
		isTransactionSuccess,
        isLoading,
        loadingOperation,
		stake,
		withdraw,
		claimReward,
	};
}

export default useTransaction;
