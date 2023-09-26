import useContractWriteOperations from "./useContractWriteOperations";
import { waitForTransaction } from "@wagmi/core";
import { useState } from "react";
import { formatEther } from "viem";
const { VITE_STRU_STAKING_CONTRACT } = import.meta.env;

// This hook recieves all the data from the useContractWriteOperations hook,
// makes all the transaction async requests,
// and keeps all the transaction information such as isLoading state and hash. 

// It returns async functions to be used in Form component and isLoading state

function useTransaction() {
	const {
		allowanceAmount,
		approvalWrite,
		stakeWrite,
		withdrawWrite,
		claimRewardWrite,
		exitWrite,
	} = useContractWriteOperations();
	const [isApprovalTransactionLoading, setIsApprovalTransactionLoading] =
		useState(false);


	const stake = async (value) => {
		const allowance = Number(formatEther(allowanceAmount));
		// Before doing the write method for staking, we check the allowance amount and,
		// if it is less than the amount of the current operation, we do the approve method and then the stake method,
		//if it is more, we immediately do the stake method
		if (Number(formatEther(value)) > allowance) {
			setIsApprovalTransactionLoading(true);
			// receiving the hash and passing it to waitForTransaction method to create a Promise and wait for the transaction to get done
			const { hash: approvalHash } = await approvalWrite({
				args: [VITE_STRU_STAKING_CONTRACT, value],
			});
			const { status: approvalStatus } = await waitForTransaction({
				hash: approvalHash,
			});
			// when the transaction is done we recieve a result of Promise and proceed with the next, "stake" method
			approvalStatus && setIsApprovalTransactionLoading(false);
			if (approvalStatus === "success") {
				const { hash: stakeHash } = await stakeWrite({
					args: [value],
				});
				const response = await waitForTransaction({
					hash: stakeHash,
				});
				return response;
			}
			// As was already mentioned above, if the allowance >= current operation's amount we immediately proceed with "stake" method
		} else {
			const { hash: stakeHash } = await stakeWrite({
				args: [value],
			});
			const response = await waitForTransaction({
				hash: stakeHash,
			});
			return response;
		}
	};

	const withdraw = async (value) => {
		const { hash } = await withdrawWrite({
			args: [value],
		});
		const response = await waitForTransaction({hash});
		return response;
	};

	const claimReward = async () => {
		const { hash } = await claimRewardWrite();
		const response = await waitForTransaction({ hash });
		return response;
	};

	const exit = async () => {
		const { hash } = await exitWrite();
		const response = await waitForTransaction({ hash });
		return response;
	};

	return {
		isApprovalTransactionLoading,
		stake,
		withdraw,
		claimReward,
		exit,
	};
}

export default useTransaction;
