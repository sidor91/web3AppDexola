import { Container, Icon, Text, Button } from "./NotAuthorizedSection.styled";
import walletIcon from "@/assets/walletIcon.svg";


function NotAuthorizedSection() {

    const handleClick = () => {
        const connectWalletButton = document.getElementById("connectWallet");
        connectWalletButton && connectWalletButton.click();
    }
    
	return (
		<Container>
			<Icon
				src={walletIcon}
				alt="Wallet not connected"
				width={96}
				height={96}
			/>
			<Text>To start staking you need to connect you wallet first</Text>
			<Button type="button" onClick={handleClick}>
				Connect Wallet
			</Button>
		</Container>
	);
}

export default NotAuthorizedSection;
