import styled, { keyframes } from "styled-components";
import { media } from "@/utils/mediaRules";

const fadeInOutAnimation = keyframes`
    0% {
    opacity: 0%;
  }
  30% {
	opacity: 100%;
  }
  70% {
	opacity: 100%;
  }
  100% {
   opacity: 0%;
  }
`;


export const Container = styled.div`
	display: flex;
	gap: 16px;
	opacity: 0;
	justify-content: center;
	align-items: center;
	animation: ${fadeInOutAnimation} 4s ease-in-out;
	animation-iteration-count: 1;
`;

export const TextContainer = styled.div``;

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

export const EmphasisTetx = styled.span`
	font: var(--font-operation-status-amount-mobile);

	@media ${media.minTablet} {
		font: var(--font-operation-status-amount-tablet-web);
	}
`;