import styled from "styled-components";
import { media } from "@/utils/mediaRules";

export const StyledFooter = styled.footer`
	min-width: var(--width-mobile);
	border-top: 1px solid var(--color-accent-blue);
	box-sizing: border-box;
	margin-top: 9px;

	@media ${media.minTablet} {
		margin-top: 0;
	}
`;

export const Container = styled.div`
	max-width: var(--width-web);
	display: flex;
	justify-content: space-between;
	box-sizing: border-box;
	align-items: center;
	margin-left: auto;
	margin-right: auto;
	box-sizing: border-box;
	padding: 8px 24px 17px;

	@media ${media.minTablet} {
		padding: 16px 48px;
	}

	@media ${media.minDesktop} {
		padding-left: 40px;
		padding-right: 40px;
	}
`;

export const Text = styled.p`
	display: block;
	color: var(--color-light-grey);
	font: var(--font-body-mobile);
	font-size: 11px;

	@media ${media.minTablet} {
		font: var(--font-body-mobile);
	}
`;