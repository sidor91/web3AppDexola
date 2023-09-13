import styled from "styled-components";
import { media } from "@/utils/mediaRules";
import { StyledButton } from "@/components/SharedElements.styled";


export const StyledTable = styled.table`
	table-layout: auto;
	border-collapse: collapse;


	@media ${media.minTablet} {
		display: table;
        width: initial;
	}

	@media ${media.minDesktop} {
	}
`;

export const Tbody = styled.tbody`

`;

export const TR = styled.tr`
	
`;



export const TD = styled.td`
	width: fit-content;
	box-sizing: content-box;
	/* position: relative; */

	&:not(:last-child) {
		padding-right: 10px;

		@media ${media.minTablet} {
			padding-right: 24px;
		}

		@media ${media.minDesktop} {
			padding-right: 40px;
		}
	}

	@media ${media.minTablet} {
		position: relative;
		&:nth-child(1) {
			width: 170px;
		}

		&:nth-child(2) {
			width: 88px;
		}

		&:nth-child(3) {
			width: 88px;
		}

		&:nth-child(4) {
			width: 25%;
		}
	}

	@media ${media.minDesktop} {
		&::after {
			content: attr(aria-label);
			position: absolute;
			top: 43%;
			font: var(--font-counter-text-tablet-web);
		}

		&:nth-child(1) {
			width: 309px;
			&::after {
				left: 146px;
			}
		}

		&:nth-child(2) {
			width: 153px;
			&::after {
				left: 77px;
			}
		}

		&:nth-child(3) {
			width: 72px;
			&::after {
				left: 34px;
			}
		}

		&:nth-child(4) {
			width: 179px;
			&::after {
				left: 81px;
			}
		}
	}
`;


export const Caption = styled.caption`
	position: absolute;
	left: -9999px;
	width: 1px;
	height: 1px;
	overflow: hidden;
`;

export const Value = styled.span`
	font: var(--font-counter-numbers-mobile);

   

	@media ${media.minTablet} {
		font: var(--font-counter-numbers-tablet);
	}

	@media ${media.minDesktop} {
		font: var(--font-counter-numbers-web);
	}
`;

export const Units = styled.span`
	font: var(--font-counter-units-mobile);
	line-height: 1.66;
	margin-left: 4px;

	@media ${media.minTablet} {
		font: var(--font-counter-units-tablet);
		line-height: 1.25;
		margin-left: 8px;
	}

	@media ${media.minDesktop} {
		font: var(--font-counter-units-web);
		line-height: normal;
	}
`;

export const ValueTitle = styled.span`
	font: var(--font-counter-text-mobile);
	@media ${media.minTablet} {
		font: var(--font-counter-text-tablet-web);
	}
`;

export const Icon = styled.img`
	display: inline-block;
	margin: 0;
	padding: 0;
	margin-left: 5px;
	/* position: absolute;
	top: 50%;
	transform: translateY(-50%);
	right: 20px; */
	
	width: 10px;
	height: 10px;

	@media ${media.minTablet} {
		margin-left: 8px;
		width: 16px;
		height: 16px;
	}

	@media ${media.minDesktop} {
		width: 18px;
		height: 18px;
		float: right;
		margin-left: unset;
		transform: translateY(120%);
	}
`;