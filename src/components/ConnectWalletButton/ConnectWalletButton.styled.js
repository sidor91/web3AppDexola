import styled from "styled-components";
import { media } from "@/utils/mediaRules";
import { StyledButton } from "@/components/SharedElements.styled";

export const Button = styled(StyledButton)`
	padding: 8px 24px;

	@media ${media.minTablet} {
		padding: 12px 40px;
	}
`;

export const BalanceContainer = styled.button`
	display: flex;
	align-items: center;
	background-color: transparent;
	border: none;
	color: var(--color-white);
	cursor: pointer;
`;

export const Icon = styled.img`
margin-right: 8px;
border-radius: 50%;
`

export const BalanceText = styled.p`
	font: var(--font-balance-mobile);
	text-transform: uppercase;

	@media ${media.minTablet} {
		font: var(--font-balance-tablet-web);
	}
`;