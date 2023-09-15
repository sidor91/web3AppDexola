import styled from "styled-components";
import { media } from "@/utils/mediaRules";

export const H1heading = styled.h1`
	font: var(--font-title-mobile);
	color: var(--color-white);

	@media ${media.minTablet} {
		font: var(--font-title-tablet);
	}

	@media ${media.minDesktop} {
		font: var(--font-title-web);
	}
`;

export const H2heading = styled.h3`
	font: var(--font-subtitle-mobile);
	color: var(--color-white);

	@media ${media.minTablet} {
		font: var(--font-subtitle-tablet-web);
	}
`;

export const Paragraph = styled.p`
	font: var(--font-body-mobile);
	color: var(--color-light-grey);

	@media ${media.minTablet} {
		font: var(--font-body-tablet-web);
	}
`;

export const StyledButton = styled.button`
	background-color: var(--color-button);
	color: var(--color-white);
	text-transform: uppercase;
	cursor: pointer;
	border: none;

	&:hover {
		background-color: var(--color-button-hover);
	}

	font: var(--font-button-mobile);

	@media ${media.minTablet} {
		font: var(--font-button-web-tablet);
	}
`;

export const StyledSection = styled.section`
	width: 100%;
	box-sizing: border-box;
	min-width: var(--width-mobile);
`;
