import styled from "styled-components";
import { media } from "@/utils/mediaRules";
import { H1heading, StyledSection } from "@/components/SharedElements.styled";
import topBackgroundMobile from "@/assets/topBackgroundMobile.webp";
import topBackgroundTablet from "@/assets/topBackgroundTablet.webp";
import topBackgroundWeb from "@/assets/topBackgroundDesktop.webp";

export const Section = styled(StyledSection)`
	/* background-image: url(${topBackgroundMobile}); */
	/* position: sticky;
	top: ${({ $isconnected }) => ($isconnected ? "30" : "46px")};
	left: 0;
	z-index: 88; */
	/* background-color: var(--color-black); */

	@media ${media.minTablet} {
		/* background-image: url(${topBackgroundTablet}); */
		/* background-position: center;
		background-size: cover;
		background-repeat: no-repeat; */
		/* top: 69px; */
		/* position: initial;
		z-index: 1; */
	}

	@media ${media.minDesktop} {
		/* background-image: url(${topBackgroundWeb}); */
	}
`;

export const Container = styled.div`
	max-width: var(--width-web);
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;
	padding: 22px 24px 24px;

	@media ${media.minTablet} {
		padding: 32px 48px 33.5px;
	}

	@media ${media.minDesktop} {
		padding: 24px 120px 48px;
	}
`;

export const Header = styled(H1heading)`
	margin-bottom: 26px;
	padding-right: 67px;

	@media ${media.minTablet} {
		margin-bottom: 17.5px;
	}

	@media ${media.minDesktop} {
		margin-bottom: 16px;
	}
`;