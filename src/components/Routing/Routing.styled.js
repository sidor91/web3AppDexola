import styled from "styled-components";
import { media } from "@/utils/mediaRules";
import { NavLink } from "react-router-dom";

export const Container = styled.div`
	width: 100%;
	background-color: var(--color-black);
	border-radius: 16px 16px 0px 0px;

	@media ${media.minTablet} {
		border-radius: 0;
	}
`;

export const RoutingSection = styled.div`
	padding: 32px 24px 16px;
	display: flex;
	max-width: var(--width-web);
	box-sizing: border-box;
	margin-left: auto;
	margin-right: auto;

	@media ${media.minTablet} {
		padding-top: 59px;
		padding-left: 48px;
		padding-right: 48px;
		justify-content: initial;
	}

	@media ${media.minDesktop} {
		padding-top: 56px;
		padding-left: 120px;
		padding-right: 120px;
	}
`;

export const NavigationLink = styled(NavLink)`
	font: var(--font-tabs-title-mobile);
	letter-spacing: -0.28px;
	color: ${(props) => (props.$isactive ? "white" : "grey")};
	text-decoration: none;
	white-space: nowrap;
	position: relative;
	${(props) =>
		props.$isactive &&
		`&::after {
		content: "";
		width: 100%;
        height: 6px;
		background-color: var(--color-accent-blue);
		position: absolute;
		bottom: -16px;
		left: 0;

        @media ${media.minTablet} {
		height: 8px;
        width: calc(100% - 64px);
        left: 32px;
	}
	}`}

	@media ${media.minTablet} {
		padding-left: 32px;
		padding-right: 32px;
		font: var(--font-tabs-title-tablet-web);
		letter-spacing: normal;
	}

	&:nth-child(1) {
		margin-right: 68px;

		@media ${media.minTablet} {
			margin-right: 0;
		}
	}

	&:nth-child(2) {
		margin-right: 43px;

		@media ${media.minTablet} {
			margin-right: 0;
		}
	}
`;