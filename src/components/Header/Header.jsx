import {
	StyledHeader,
	LogoIcon,
	Button,
} from "./Header.styled";
import Logo from "@/assets/Logo.svg";
import { useConnect, useAccount } from "wagmi";

function Header() {
	 const {  isConnected } = useAccount();
		const { connect, connectors, error, isLoading, pendingConnector } =
			useConnect();
	const connector = connectors[0]

	return (
		<StyledHeader>
			<LogoIcon src={Logo} alt="Logo" aria-label="Logo DX" />
			<Button onClick={() => connect({ connector })} aria-label="join now">
				connect wallet
			</Button>
		</StyledHeader>
	);
}

export default Header;
