import styled from "styled-components";
import { media } from "@/utils/mediaRules";
import { H1heading, StyledSection } from "@/components/SharedElements.styled";

export const Section = styled(StyledSection)`
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