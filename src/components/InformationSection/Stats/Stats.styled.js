import styled from "styled-components";
import { media } from "@/utils/mediaRules";
import { Tooltip } from "react-tooltip";

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
	
	justify-content: start;
    align-items: baseline;
`;

export const Value = styled.p`
	display: inline-flex;

	font: var(--font-counter-numbers-mobile);

	@media ${media.minTablet} {
		font: var(--font-counter-numbers-tablet);
	}

	@media ${media.minDesktop} {
		margin-right: 12px;
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
		margin-left: 0;
	}
`;

export const DescriptionContainer = styled.div`
	margin-top: 4px;
	display: flex;
	justify-content: center;
	@media ${media.minTablet} {
		justify-content: start;
	}
`;

export const Description = styled.p`
	font: var(--font-counter-text-mobile);
	display: inline-flex;
	@media ${media.minTablet} {
		margin-top: 0;
		font: var(--font-counter-text-tablet-web);
	}
`;

export const IconHelper = styled.img`
	/* display: inline-block;
	margin: 0;
	padding: 0; */
	width: 10px;
	height: 10px;
	margin-left: 5px;
	cursor: pointer;

	@media ${media.minTablet} {
		margin-left: 8px;
		width: 16px;
		height: 16px;
	}

	@media ${media.minDesktop} {
		width: 18px;
		height: 18px;
	}
`;

export const TooltipLink = styled.a`
	@media ${media.minDesktop} {
		order: 3;
	}
`;


export const TooltipContainer = styled.div`
	display: inline-block;
	margin: 0;
	padding: 0;
	order: 3;
`;