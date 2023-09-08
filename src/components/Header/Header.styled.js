import styled from "styled-components";
import { media } from "@/utils/mediaRules";
import { StyledButton } from "@/components/SharedElements.styled";

export const StyledHeader = styled.header`
	/* width: 100%; */
	/* flex: 1; */
	min-width: var(--width-mobile);
	max-width: var(--width-web);
	box-sizing: border-box;
	padding: 3px 24px;
	display: flex;
	justify-content: space-between;
	box-sizing: border-box;
	align-items: center;
	margin-left: auto;
	margin-right: auto;
	/* position: sticky;
	top: 0;
	z-index: 999;
	background-color: var(--color-background); */

	@media ${media.minTablet} {
		padding: 11px 48px;
	}

	@media ${media.minDesktop} {
		padding-left: 40px;
		padding-right: 40px;
	}
`;

// export const Container = styled.div`
// width: 100%;
// 	max-width: var(--width-web);
// 	padding: 3px 24px;
// 	display: flex;
// 	justify-content: space-between;
// 	box-sizing: border-box;
// 	align-items: center;
// 	margin-left: auto;
// 	margin-right: auto;

// 	@media ${media.minTablet} {
// 		padding-top: 15px;
// 		padding-bottom: 15px;
// 	}

// 	@media ${media.minDesktop} {
// 		padding-left: 120px;
// 		padding-right: 120px;
// 	}
// `;

export const Button = styled(StyledButton)`
	padding: 10px 23px;

	@media ${media.minTablet} {
		padding: 12px 40px;
	}
`;

export const LogoIcon = styled.img`
	width: 34.5px;
	height: 19.5px;
`;
