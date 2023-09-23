import { Oval } from "react-loader-spinner";
import { TextContainer, Message, Amount } from "./Loader.styled";
import { formatEther } from "viem";

function Loader({ pathname, operationAmount, isApprovalLoading }) {
	const amount = formatEther(operationAmount);

	return (
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
			<TextContainer>
				{pathname === "/stake" && (
					<Message>
						{isApprovalLoading ? "Approving" : "Adding"}{" "}
						{<Amount>{`${amount} STRU`}</Amount>} {"to Staking"}
					</Message>
				)}
				{pathname === "/withdraw" && (
					<Message>
						{`Withdrawing`} {<Amount>{`${amount} STRU`}</Amount>}{" "}
						{"from Staking"}
					</Message>
				)}
				{pathname === "/rewards" && (
					<Message>
						{`Claiming rewards of`} {<Amount>{`${amount} STRU`}</Amount>}
					</Message>
				)}
			</TextContainer>
		</>
	);
}

export default Loader;
