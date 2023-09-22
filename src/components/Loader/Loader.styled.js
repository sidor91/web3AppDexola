import styled from "styled-components";
import { media } from "@/utils/mediaRules";

export const Container = styled.div`
display: flex;
gap: 16px;
justify-content: center;
align-items: center;
`
export const TextContainer = styled.div`

`

export const Message = styled.p`
	font: var(--font-operation-status-text-mobile);

	@media ${media.minTablet} {
		font: var(--font-operation-status-text-tablet-web);
	}
`;

export const Amount = styled.span`
	font: var(--font-operation-status-amount-mobile);

	@media ${media.minTablet} {
		font: var(--font-operation-status-amount-tablet-web);
	}
`;