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
	isTransactionSuccess,
	transactionAmount,
	setIsSuccess,
	setIsError,
}) {
	const amount = formatEther(transactionAmount);
	const [operationStatusIcon, setOperationStatusIcon] = useState(null);
    const [isVisible, setIsVisible] = useState(true); 

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false);
			setIsSuccess(false);
			setIsError(false);
		}, 5000);

		return () => {
			clearTimeout(timer);
		};
	}, [setIsError, setIsSuccess]);

	useEffect(() => {
		if (isTransactionSuccess) {
			setOperationStatusIcon(successIcon);
		} else if (isError) {
			setOperationStatusIcon(errorIcon);
		}
	}, [isTransactionSuccess, isError]);

	return (
		<Container>
			{isVisible && (
				<>
					<img
						src={operationStatusIcon}
						alt="status icon"
						height={32}
						width={32}
					/>
					{isTransactionSuccess && (
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
				</>
			)}
		</Container>
	);
}

export default OperationStatusToast;


OperationStatusToast.propTypes = {
	transactionType: PropTypes.string,
	isError: PropTypes.bool,
	isTransactionSuccess: PropTypes.bool,
	transactionAmount: PropTypes.bigint,
	setIsSuccess: PropTypes.func,
	setIsError: PropTypes.func,
};