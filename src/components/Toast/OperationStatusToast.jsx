import {
	Container,
	TextContainer,
	Message,
	Amount,
	EmphasisTetx,
} from "./OperationStatusToast.styled";
import { useEffect, useState } from "react";
import errorIcon from "@/assets/errorIcon.svg";
import successIcon from "@/assets/successIcon.svg";
import { formatEther } from "viem";
import PropTypes from "prop-types";

function OperationStatusToast({
	transactionType,
	isError,
	isSuccess,
	transactionAmount,
	removeTransactionFromStack,
	id,
}) {
	const [operationStatusIcon, setOperationStatusIcon] = useState(null);
	const [amount, setAmount] = useState(0);

	useEffect(() => {
		if (transactionAmount) {
			const value = formatEther(transactionAmount);
			setAmount(value);
		}
	}, [transactionAmount]);

	useEffect(() => {
		const timer = setTimeout(() => {
			removeTransactionFromStack(id);
		}, 4000);

		return () => {
			clearTimeout(timer);
		};
	}, [removeTransactionFromStack, id]);

	useEffect(() => {
		if (isSuccess) {
			setOperationStatusIcon(successIcon);
		} else if (isError) {
			setOperationStatusIcon(errorIcon);
		}
	}, [isSuccess, isError]);

	return (
		<Container>
			<img src={operationStatusIcon} alt="status icon" height={32} width={32} />
			{isSuccess && (
				<TextContainer>
					{transactionType === "stake" && (
						<Message>
							<Amount>{`${amount} STRU`}</Amount>{" "}
							{"Successfully added to Staking"}
						</Message>
					)}
					{transactionType === "withdraw" && (
						<Message>
							<Amount>{`${amount} STRU`}</Amount>{" "}
							{"were successfully withdrawn from Staking"}
						</Message>
					)}
					{transactionType === "exit" && (
						<Message>
							{"All tokens and all rewards were successfully withdrawn"}
						</Message>
					)}
					{transactionType === "rewards" && (
						<Message>
							<Amount>{`${amount} STRU`}</Amount>{" "}
							{"were successfully added to your STRU wallet balance"}
						</Message>
					)}
				</TextContainer>
			)}
			{isError && (
				<TextContainer>
					<Message>
						<EmphasisTetx>Connection Error.</EmphasisTetx> Please try again
					</Message>
				</TextContainer>
			)}
		</Container>
	);
}

export default OperationStatusToast;

OperationStatusToast.propTypes = {
	transactionType: PropTypes.string,
	isError: PropTypes.bool,
	isSuccess: PropTypes.bool,
	transactionAmount: PropTypes.bigint,
	removeTransactionFromStack: PropTypes.func,
	id: PropTypes.string,
};
