import { Oval } from "react-loader-spinner";
import { Container, TextContainer, Message, Amount } from "./Loader.styled";
import { formatEther } from "viem";
import PropTypes from "prop-types";

function Loader({
	transactionType,
	transactionAmount,
	isApprovalLoading,
}) {
	const amount = transactionAmount && formatEther(transactionAmount);

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
			<TextContainer>
				{transactionType === "stake" && (
					<Message>
						{isApprovalLoading ? "Approving" : "Adding"}{" "}
						{<Amount>{`${amount} STRU`}</Amount>} {"to Staking"}
					</Message>
				)}
				{transactionType === "withdraw" && (
					<Message>
						{`Withdrawing`} {<Amount>{`${amount} STRU`}</Amount>}{" "}
						{"from Staking"}
					</Message>
				)}
				{transactionType === "exit" && (
					<Message>{`Withdrawing all tokens and all rewards`}</Message>
				)}
				{transactionType === "rewards" && (
					<Message>
						{`Claiming rewards of`} {<Amount>{`${amount} STRU`}</Amount>}
					</Message>
				)}
			</TextContainer>
		</Container>
	);
}

export default Loader;

Loader.propTypes = {
	transactionType: PropTypes.string,
	transactionAmount: PropTypes.bigint,
	isApprovalLoading: PropTypes.bool,
};