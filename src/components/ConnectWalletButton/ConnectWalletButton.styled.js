import styled from "styled-components";
import { media } from "@/utils/mediaRules";
import { StyledButton } from "@/components/SharedElements.styled";

export const Button = styled(StyledButton)`
	padding: 10px 23px;

	@media ${media.minTablet} {
		padding: 12px 40px;
	}
`;

export const BalanceContainer = styled.div`
display: flex;
align-items: center;
`

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