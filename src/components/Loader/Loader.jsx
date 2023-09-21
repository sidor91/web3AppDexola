import { Oval } from "react-loader-spinner";
import { useState, useEffect } from "react";
import { Container, TextContainer } from "./Loader.styled";
import { formatEther } from "viem";

function Loader({
	pathname,
	// isLoading,
	// isError,
	// loadingOperation,
	operationAmount,
	isApprovalLoading,
	// isTransactionSuccess,
	// isTransactionError,
}) {
	const [loadingMessage, setLoadingMessage] = useState("");

	useEffect(() => {
		const amount = formatEther(operationAmount);
		// if (isLoading) {
		switch (pathname) {
			case "/stake":
				setLoadingMessage(`Adding ${amount} STRU to Staking`);
				break;
			case "/withdraw":
				setLoadingMessage(`Withdrawing ${amount} STRU from Staking`);
				break;
			case "/rewards":
				setLoadingMessage(`Claiming rewards of ${amount} STRU`);
		}
		// }
		// else if (isTransactionSuccess && loadingOperation !== "Approving") {
		// 	setOperationStatusIcon(successIcon);
		// 	switch (pathname) {
		// 		case "/stake":
		// 			setLoadingMessage(`${amount} STRU Successfully added to Staking`);
		// 			break;
		// 		case "/withdraw":
		// 			setLoadingMessage(
		// 				`${amount} STRU were successfully withdrawn from Staking`
		// 			);
		// 			break;
		// 		case "/rewards":
		// 			setLoadingMessage(
		// 				`${amount} STRU were successfully added to your STRU wallet balance`
		// 			);
		// 	}
		// } else if (isError) {
		// 	setOperationStatusIcon(errorIcon);
		// 	setLoadingMessage("Connection Error. Please try again");
		// }
	}, [
		pathname,
		// loadingOperation,
		operationAmount,
		// isLoading,
		// isTransactionSuccess,
		// isTransactionError,
		// isError,
	]);

	return (
		<Container>
			<Oval
				height={32}
				width={32}
				color="#20FE51"
				visible={true}
				ariaLabel="oval-loading"
				secondaryColor="#6E758B"
				strokeWidth={6}
				strokeWidthSecondary={6}
			/>
			<TextContainer>{loadingMessage}</TextContainer>
		</Container>
	);
}

export default Loader;