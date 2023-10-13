import useContractWriteOperations from "./useContractWriteOperations";
import { waitForTransaction } from "@wagmi/core";
import { useState } from "react";
import { formatEther } from "viem";
const { VITE_STRU_STAKING_CONTRACT } = import.meta.env;

// This hook recieves all the data from the useContractWriteOperations hook,
//  and makes all the transaction async requests.
// It returns async functions to be used in Form component.

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
	const [apporvalTransactionHash, setApporvalTransactionHash] = useState("");

	const stake = async (value) => {
		const allowance = Number(formatEther(allowanceAmount));
		// Before doing the 'stake' method, we check the allowance amount and,
		// if it is less than the amount of the current transaction, we do the 'approve' method and then the 'stake' method.
		if (Number(formatEther(value)) > allowance) {
			// using this state to display whether the process of approval or staking taking place
			// receiving the hash and passing it to waitForTransaction method to create a Promise and wait for the transaction to get done
			try {
				setIsApprovalTransactionLoading(true);
				const { hash: approvalHash } = await approvalWrite({
					args: [VITE_STRU_STAKING_CONTRACT, value],
				});
				setApporvalTransactionHash(approvalHash);
				const { status: approvalStatus } = await waitForTransaction({
					hash: approvalHash,
				});
				// when the transaction is done we recieve a result of Promise and proceed with the next, "stake" method
				if (approvalStatus) {
					setApporvalTransactionHash("");
					setIsApprovalTransactionLoading(false);
				}
				
				if (approvalStatus === "success") {
					const { hash: stakeHash } = await stakeWrite({
						args: [value],
					});
					// Return the Promise to use it during the submission to control loading state as well as and success/error states
					const response = await waitForTransaction({
						hash: stakeHash,
					});
					return response;
				}
			} catch (error) {
				setIsApprovalTransactionLoading(false);
				throw new Error(error);
			}
			// If the allowance >= current operation's amount we immediately proceed with "stake" method
		} else {
			const { hash: stakeHash } = await stakeWrite({
				args: [value],
			});
			// Return the Promise to use it during the submission to control loading state as well as and success/error states
			const response = await waitForTransaction({
				hash: stakeHash,
			});
			return response;
		}
	};

	// By the same schema we are doing withdraw, claimReward and exit functions, except the 'approve' method
	const withdraw = async (value) => {
		const { hash } = await withdrawWrite({
			args: [value],
		});
		const response = await waitForTransaction({ hash });
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
