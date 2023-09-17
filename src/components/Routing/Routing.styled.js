import styled from "styled-components";
import { media } from "@/utils/mediaRules";
import { NavLink } from "react-router-dom";

export const Container = styled.div`
	width: 100%;
	background-color: var(--color-black);
	border-radius: 16px 16px 0px 0px;
	border-bottom: 1px solid var(--color-accent-blue);

	@media ${media.minTablet} {
		border-bottom: none;
		border-radius: 0;
	}
`;

export const RoutingSection = styled.nav`
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
	text-decoration: none;

	@media ${media.minTablet} {
		padding-left: 32px;
		padding-right: 32px;
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

export const LinkText = styled.span`
	font: var(--font-tabs-title-mobile);
	letter-spacing: -0.28px;
	color: var(--color-light-grey);
	white-space: nowrap;
	position: relative;

	&:hover {
		color: var(--color-white);
	}

	@media ${media.minTablet} {
		font: var(--font-tabs-title-tablet-web);
		letter-spacing: normal;
	}
`;

export const LinkTextActive = styled(LinkText)`
	color: var(--color-white);

	&::after {
		content: "";
		width: 100%;
		height: 6px;
		background-color: var(--color-accent-blue);
		position: absolute;
		bottom: -16px;
		left: 0;

		@media ${media.minTablet} {
			height: 8px;
		}
	}
`;

