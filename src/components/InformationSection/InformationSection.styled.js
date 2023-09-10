import styled from "styled-components";
import { media } from "@/utils/mediaRules";
import { H1heading, StyledSection } from "@/components/SharedElements.styled";
import topBackgroundMobile from "@/assets/topBackgroundMobile.webp";
import topBackgroundTablet from "@/assets/topBackgroundTablet.webp";
import topBackgroundWeb from "@/assets/topBackgroundDesktop.webp";

export const Section = styled(StyledSection)`
	background-image: url(${topBackgroundMobile});

	@media ${media.minTablet} {
		background-image: url(${topBackgroundTablet});
	}

	@media ${media.minDesktop} {
		background-image: url(${topBackgroundWeb});
	}
`;

export const Container = styled.div`
	max-width: var(--width-web);
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;

	padding-left: 24px;
	padding-right: 24px;

	@media ${media.minTablet} {
		padding-left: 48px;
		padding-right: 48px;
	}

	@media ${media.minDesktop} {
		padding-left: 120px;
		padding-right: 120px;
	}
`;

export const Header = styled(H1heading)`
text-transform: uppercase;
`;