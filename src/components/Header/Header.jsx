import { StyledHeader } from "./Header.styled";
import Logo from "@/assets/Logo.svg";
import {
	useConnect,
	useAccount,
	useContractRead,
	usePublicClient,
} from "wagmi";
import { getContract } from "viem";
import STRUtokenAbi from "@/contractABI";

import ConnectWalletButton from "@/components/ConnectWalletButton/ConnectWalletButton";


function Header() {
	//  const { address, isConnected } = useAccount();
	// const publicClient = usePublicClient();
	// const contract = getContract({
	// 	address: "0x2F112ED8A96327747565f4d4b4615be8fb89459d",
	// 	abi: STRUtokenAbi,
	// 	publicClient,
	// });

	// const { data, isError, isLoading } = useContractRead({
	// 	address: "0x2F112ED8A96327747565f4d4b4615be8fb89459d",
	// 	abi: STRUtokenAbi,
	// 	functionName: "balanceOf",
	// 	args: ["0x99824818480d6178b1f5d9DA6A42810Ea97edDE4"],
	// });

	// console.log(connector);


	// (async () => {
	// 	console.log(balance)
	// })()

	return (
		<StyledHeader>
			<img
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
