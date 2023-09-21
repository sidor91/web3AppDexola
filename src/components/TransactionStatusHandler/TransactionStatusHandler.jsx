import { Oval } from "react-loader-spinner";
import errorIcon from "@/assets/errorIcon.svg";
import successIcon from "@/assets/successIcon.svg";
import { useState, useEffect } from "react";
import { Container, TextContainer } from "./TransactionStatusHandler.styled";
import { formatEther } from "viem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function TransactionStatusHandler({
	pathname,
	isLoading,
	isError,
	loadingOperation,
	operationAmount,
	isTransactionSuccess,
	isTransactionError,
}) {
	const [loadingMessage, setLoadingMessage] = useState("");

	

	useEffect(() => {
		const amount = formatEther(operationAmount);
		if (isLoading) {
			switch (pathname) {
				case "/stake":
					setLoadingMessage(`${loadingOperation} ${amount} STRU to Staking`);
					break;
				case "/withdraw":
					setLoadingMessage(`${loadingOperation} ${amount} STRU from Staking`);
					break;
				case "/rewards":
					setLoadingMessage(`${loadingOperation} of ${amount} STRU`);
			}
		} else if (isTransactionSuccess && loadingOperation !== "Approving") {
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
			setLoadingMessage("Connection Error. Please try again");
		}
	}, [
		pathname,
		loadingOperation,
		operationAmount,
		isLoading,
		isTransactionSuccess,
		isTransactionError,
		isError,
	]);

	

	return (
		<Container>
			{isLoading && (
				<>
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
				</>
			)}
			{isTransactionSuccess && loadingOperation !== "Approving" && (
				<>
					<img width={32} height={32} src={successIcon} />
					<TextContainer>{loadingMessage}</TextContainer>
				</>
			)}
			{isError && (
				<>
					<img width={32} height={32} src={errorIcon} />
					<TextContainer>{loadingMessage}</TextContainer>
				</>
			)}
		</Container>
	);
}

export default TransactionStatusHandler;
