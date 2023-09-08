import {
	StyledHeader,
	LogoIcon,
	Button,
	// Container,
} from "./Header.styled";
import Logo from "@/assets/Logo.svg";

function Header() {
	return (
		<StyledHeader>
			{/* <Container> */}
				<LogoIcon src={Logo} alt="Logo" aria-label="Logo DX" />
				<Button
					onClick={()=>{}}
					aria-label="join now"
				>
					connect wallet
				</Button>
			{/* </Container> */}
		</StyledHeader>
	);
}

export default Header;
