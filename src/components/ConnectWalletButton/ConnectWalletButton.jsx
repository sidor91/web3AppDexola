import {
	Button,
	Icon,
	BalanceContainer,
	BalanceText,
} from "./ConnectWalletButton.styled";
import { useWeb3Modal } from "@web3modal/react";
import { useState, useRef } from "react";
import struIcon from "@/assets/struIcon.png";
import ethIcon from "@/assets/ethIcon.svg";
import useWindowDimensions from "@/utils/hooks/useWindowDimensions";
import useAccountAndBalance from "@/utils/hooks/useAccountAndBalance";

function ConnectWalletButton({}) {
	const [loading, setLoading] = useState(false);
	const { open } = useWeb3Modal();
	const dimensions = useWindowDimensions();
	const { addressToShow, struBalance = 0, sepoliaBalance = 0, isConnected } =
		useAccountAndBalance();
	const buttonRef = useRef(null);

	async function onOpen() {
		setLoading(true);
		await open();
		setLoading(false);
	}

	return (
		<>
			{!isConnected ? (
				<Button
					onClick={() => onOpen()}
					aria-label="join now"
					disabled={loading}
					ref={buttonRef}
					id="connectWallet"
				>
					{!isConnected && !loading && "Connect Wallet"}
					{loading && "Loading..."}
				</Button>
			) : (
				<BalanceContainer onClick={() => onOpen()}>
					<Icon src={struIcon} width={24} height={24} />
					<BalanceText style={{ marginRight: 12 }}>
						{struBalance} stru
					</BalanceText>
					<Icon src={ethIcon} width={24} height={24} />
					<BalanceText>{sepoliaBalance} eth</BalanceText>
					{dimensions >= 744 && (
						<>
							<BalanceText style={{ marginLeft: 8, marginRight: 8 }}>
								|
							</BalanceText>
							<BalanceText>{addressToShow}...</BalanceText>
						</>
					) }
				</BalanceContainer>
			)}
		</>
	);
}

export default ConnectWalletButton;
