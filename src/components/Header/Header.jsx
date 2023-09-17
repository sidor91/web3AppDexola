import { StyledHeader, Icon } from "./Header.styled";
import Logo from "@/assets/Logo.svg";
import ConnectWalletButton from "@/components/ConnectWalletButton/ConnectWalletButton";

function Header() {
	return (
		<StyledHeader>
			<Icon
				src={Logo}
				alt="Logo"
				aria-label="Logo DX"
				width={34.5}
				height={19.5}
			/>
			<ConnectWalletButton />
		</StyledHeader>
	);
}

export default Header;
