import { TextContainer } from "./OperationStatusToast.styled";
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
	const [loadingMessage, setLoadingMessage] = useState("");
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
			switch (pathname) {
				case "/stake":
					setLoadingMessage(`${amount} STRU Successfully added to Staking`);
					break;
				case "/withdraw":
					setLoadingMessage(
						`${amount} STRU were successfully withdrawn from Staking`
					);
					break;
				case "/rewards":
					setLoadingMessage(
						`${amount} STRU were successfully added to your STRU wallet balance`
					);
			}
		} else if (isError) {
			setOperationStatusIcon(errorIcon);
			setLoadingMessage("Connection Error. Please try again");
		}
	}, []);

	return (
		isVisible ? <>
			<img width={32} height={32} src={operationStatusIcon} />
			<TextContainer>{loadingMessage}</TextContainer>
		</> : null
	);
}

export default OperationStatusToast;
