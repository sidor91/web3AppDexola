import {
	Button,
	Icon,
	BalanceContainer,
	BalanceText,
} from "./ConnectWalletButton.styled";
import { useWeb3Modal } from "@web3modal/react";
import { useState, useEffect } from "react";
import { useAccount, useBalance } from "wagmi";
import struIcon from "@/assets/struIcon.png";
import ethIcon from "@/assets/ethIcon.svg";
import useWindowDimensions from "@/utils/hooks/useWindowDimensions";

const { VITE_STRU_TOKEN } = import.meta.env;

function ConnectWalletButton() {
	const [loading, setLoading] = useState(false);
	const { open } = useWeb3Modal();
	const dimensions = useWindowDimensions();

	const { address, isConnected } = useAccount();
	const addressToShow = address?.slice(0, 16);

	const { data: struData } = useBalance({
		address,
		token: VITE_STRU_TOKEN,
	});
	const struBalance = struData?.formatted;

	const { data: sepoliaData } = useBalance({
		address,
	});
	const sepoliaBalance = Number(sepoliaData?.formatted).toFixed(1);

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
					{dimensions >= 744 ? (
						<>
							<BalanceText style={{ marginLeft: 8, marginRight: 8 }}>
								|
							</BalanceText>
							<BalanceText>{addressToShow}...</BalanceText>
						</>
					) : null}
				</BalanceContainer>
			)}
		</>
	);
}

export default ConnectWalletButton;
