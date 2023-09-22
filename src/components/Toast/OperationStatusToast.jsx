import {
	TextContainer,
	Container,
	Message,
	Amount,
	EmphasisTetx,
} from "./OperationStatusToast.styled";
import { useEffect, useState } from "react";
import errorIcon from "@/assets/errorIcon.svg";
import successIcon from "@/assets/successIcon.svg";
import { formatEther } from "viem";

function OperationStatusToast({
	pathname,
	isError,
	isTransactionSuccess,
	operationAmount,
}) {
	const amount = formatEther(operationAmount);
	const [operationStatusIcon, setOperationStatusIcon] = useState(null);
	// const [loadingMessage, setLoadingMessage] = useState("");
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false);
		}, 5000);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	useEffect(() => {
		if (isTransactionSuccess) {
			setOperationStatusIcon(successIcon);
		} else if (isError) {
			setOperationStatusIcon(errorIcon);
		}
	}, [isTransactionSuccess, isError]);


	return isVisible ? (
		<Container>
			<img src={operationStatusIcon} alt="status icon" height={32} width={32} />
			{isTransactionSuccess && (
				<TextContainer>
					{pathname === "/stake" && (
						<Message>
							<Amount>{`${amount} STRU`}</Amount>{" "}
							{"Successfully added to Staking"}
						</Message>
					)}
					{pathname === "/withdraw" && (
						<Message>
							<Amount>{`${amount} STRU`}</Amount>{" "}
							{"were successfully withdrawn from Staking"}
						</Message>
					)}
					{pathname === "/rewards" && (
						<Message>
							<Amount>{`${amount} STRU`}</Amount>
							{"were successfully added to your STRU wallet balance"}
						</Message>
					)}
				</TextContainer>
			)}
			{isError && (
				<TextContainer>
					<Message>
						<EmphasisTetx>Connection Error</EmphasisTetx> Please try again
					</Message>
				</TextContainer>
			)}
		</Container>
	) : null;
}

export default OperationStatusToast;
