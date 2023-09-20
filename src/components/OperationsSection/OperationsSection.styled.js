import styled from "styled-components";
import { media } from "@/utils/mediaRules";
import {
	StyledSection,
	H2heading,
	Paragraph,
} from "@/components/SharedElements.styled";

export const Section = styled(StyledSection)`
background-color: var(--color-black);
`;

export const Container = styled.div`
	padding-left: 24px;
	padding-right: 24px;
	max-width: var(--width-web);
	box-sizing: border-box;

	@media ${media.minTablet} {
		padding-left: 48px;
		padding-right: 48px;
	}

	@media ${media.minDesktop} {
		margin-left: auto;
		margin-right: auto;
		padding-left: 120px;
		padding-right: 120px;
	}
`;

export const SubContainer = styled.div`
/* margin-top: -1px; */
position: relative;
	@media ${media.minTablet} {
		padding-left: 24px;
		padding-right: 24px;
		border: 1px solid var(--color-accent-blue);
		margin-bottom: 366px;
	}

	@media ${media.minDesktop} {
		margin-bottom: 108px;
	}
`;

export const TitleContainer = styled.div`
	margin-top: 29px;
	padding-bottom: 8px;
	border-bottom: 1px solid var(--color-dark-grey);
	display: flex;
	justify-content: space-between;

	@media ${media.minTablet} {
		margin-top: 32px;
	}
`;

export const Title = styled(H2heading)``;

export const RewardRateContainer = styled.div`
display: flex;
align-items: baseline;
gap: 4px;
`
export const Text = styled(Paragraph)`

`
export const RateValue = styled.p`
	font: var(--font-reward-rate-value-mobile);

	@media ${media.minTablet} {
		font: var(--font-reward-rate-value-tablet-web);
	}
`;

export const RateUnits = styled.p`
	font: var(--font-reward-rate-units-mobile);

	@media ${media.minTablet} {
		font: var(--font-reward-rate-units-tablet-web);
	}
`;