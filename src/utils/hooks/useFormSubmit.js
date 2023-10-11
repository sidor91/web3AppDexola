import {
	// useEffect,
	useState
} from "react";
import { nanoid } from "nanoid";
// import { formatEther, parseEther } from "viem";
// import { waitForTransaction } from "@wagmi/core";

function useFormSubmit() {
	const [transactionsStack, setTransactionsStack] = useState([]);

	
	const updateTransaction = (transactionId, newValue) => {
		const updatedTransactionsStack = [...transactionsStack];
		const transactionIndexToUpdate = updatedTransactionsStack.findIndex(
			({ id }) => id === transactionId
		);
		if (transactionIndexToUpdate !== -1) {
			updatedTransactionsStack[transactionIndexToUpdate] = newValue;
			setTransactionsStack(updatedTransactionsStack);
		}
	};

	const removeTransactionFromStack = (transactionId) => {
		const updatedTransactionsStack = [...transactionsStack];
		const transactionIndexToDelete = updatedTransactionsStack.findIndex(
			({ id }) => id === transactionId
		);
		if (transactionIndexToDelete !== -1) {
			updatedTransactionsStack.splice(transactionIndexToDelete, 1);
			setTransactionsStack(updatedTransactionsStack);
		}
	};

	const onSubmitHandler = async (
		transaction,
		transactionAmount = null,
		transactionType
	) => {
		const transactionId = nanoid();

		const transactionObject = {
			id: transactionId,
			isLoading: true,
			isSuccess: false,
			isError: false,
			transactionAmount,
			transactionType,

			setIsLoading(value) {
				this.isLoading = value;
			},
			setIsSuccess(value) {
				this.isSuccess = value;
			},
			setIsError(value) {
				this.isError = value;
			},
		};
		setTransactionsStack((transactionsStack) => [
			...transactionsStack,
			transactionObject,
		]);

		try {
			const response = await transaction(transactionAmount);
			if (response) {
				transactionObject.setIsLoading(false);
				transactionObject.setIsSuccess(true);
				updateTransaction(transactionId, transactionObject);
			}
		} catch ({ message }) {
			transactionObject.setIsLoading(false);
			transactionObject.setIsError(true);
			updateTransaction(transactionId, transactionObject);
			const errorLines = message.split("\n");
			const errorMessage = `${errorLines[0]} ${errorLines[1]}`;
			console.log(errorMessage);
		}
	};

	return { transactionsStack, onSubmitHandler, removeTransactionFromStack };
}

export default useFormSubmit;
