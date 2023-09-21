import useContractWriteOperations from "./useContractWriteOperations";
import { useWaitForTransaction } from "wagmi";
import { waitForTransaction } from "@wagmi/core";
import { useState, useMemo, useEffect } from "react";
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
	const [loadingOperation, setLoadingOperation] = useState("");
	const [operationAmount, setOperationAmount] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [hash, setHash] = useState(null);

	const {
		isError: isTransactionError,
		isSuccess: isTransactionSuccess,
		isLoading: isTransactionLoading,
	} = useWaitForTransaction({
		hash,
		// onSettled() {
		//     setLoadingOperation("");
		//     setOperationAmount(0);
		// },
	});

	useEffect(() => {
		setIsLoading(
			isApprovalLoading ||
				isStakeLoading ||
				isWithdrawLoading ||
				isClaimRewardsLoading ||
				isTransactionLoading
		);
	}, [
		isApprovalLoading,
		isStakeLoading,
		isWithdrawLoading,
		isClaimRewardsLoading,
		isTransactionLoading,
	]);

	useEffect(() => {
		setIsError(
			isApprovalError ||
				isStakeError ||
				isWithDrawError ||
				isClaimRewardError ||
				isTransactionError
		);
	}, [
		isApprovalError,
		isStakeError,
		isWithDrawError,
		isClaimRewardError,
		isTransactionError,
	]);

	const stake = async (value) => {
		const allowance = formatEther(allowanceAmount);
		if (Number(value) > Number(allowance)) {
			setLoadingOperation("Approving");
			setOperationAmount(value);
			const { hash: approvalHash } = await approvalWrite({
				args: [VITE_STRU_STAKING_CONTRACT, value],
			});
			setHash(approvalHash);
			const { status: approvalStatus } = await waitForTransaction({
				hash: approvalHash,
			});
			if (approvalStatus === "success") {
				const { hash: stakeHash } = await stakeWrite({
					args: [value],
				});
				setHash(stakeHash);
				setLoadingOperation("Adding");
				setOperationAmount(value);
			}
		} else {
			setLoadingOperation("Adding");
			setOperationAmount(value);
			const { hash: stakeHash } = await stakeWrite({
				args: [value],
			});

			setHash(stakeHash);
		}
	};

	const withdraw = async (value) => {
		setLoadingOperation("Withdrawing");
		setOperationAmount(value);
		const { hash } = await withdrawWrite({
			args: [value],
		});
		setHash(hash);
	};

	const claimReward = async (value) => {
		console.log(formatEther(value));
		setLoadingOperation("Claiming Rewards");
		setOperationAmount(value);
		const { hash } = await claimRewardWrite();
		setHash(hash);
	};

	return {
		isTransactionError,
		isTransactionSuccess,
		isLoading,
		isError,
		loadingOperation,
		operationAmount,
		stake,
		withdraw,
		claimReward,
	};
}

export default useTransaction;
