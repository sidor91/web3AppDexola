import styled from "styled-components";
import { media } from "@/utils/mediaRules";

export const Container = styled.div`
	display: flex;
	justify-content: space-between;

	@media ${media.minTablet} {
		justify-content: start;
		gap: 24px;
	}

	@media ${media.minDesktop} {
		gap: 40px;
	}
`;

export const SubContainer = styled.div`
	@media ${media.minDesktop} {
		display: flex;
        align-items: baseline;
	}
`;

export const ValueContainer = styled.div`
	display: inline-flex;
    align-items: baseline;
`;

export const Value = styled.p`
	display: inline-flex;
	font: var(--font-counter-numbers-mobile);

	@media ${media.minTablet} {
		font: var(--font-counter-numbers-tablet);
	}

	@media ${media.minDesktop} {
		font: var(--font-counter-numbers-web);
	}
`;

export const Units = styled.p`
	display: inline-flex;
	font: var(--font-counter-units-mobile);
	line-height: 1.66;
	margin-left: 4px;
    text-transform: uppercase;

	@media ${media.minTablet} {
		font: var(--font-counter-units-tablet);
		line-height: 1.25;
		margin-left: 8px;
	}

	@media ${media.minDesktop} {
		font: var(--font-counter-units-web);
		line-height: normal;
        margin-right: 12px;
	}
`;

export const Description = styled.p`
	font: var(--font-counter-text-mobile);
	@media ${media.minTablet} {
		font: var(--font-counter-text-tablet-web);
	}
`;

export const IconHelper = styled.img`
	display: inline-flex;
	margin: 0;
	padding: 0;
	width: 10px;
	height: 10px;
	margin-left: 5px;

	@media ${media.minTablet} {
		margin-left: 8px;
		width: 16px;
		height: 16px;
	}

	@media ${media.minDesktop} {
		width: 18px;
		height: 18px;
        order: 3;
	}
`;