import styled from "styled-components";
import { media } from "@/utils/mediaRules";
import { StyledSection } from "@/components/SharedElements.styled";
import { NavLink } from "react-router-dom";

export const RoutingSection = styled(StyledSection)`
	padding: 32px 24px 16px;
	/* padding-left: 24px;
    padding-right: 24px; */
	border-radius: 16px 16px 0px 0px;
	/* border-bottom: 1px solid var(--color-accent-blue); */

	@media ${media.minTablet} {
		border-radius: 0;
		/* width: calc(100% - 96px); */
		padding-top: 59px;
        padding-left: 48px;
        padding-right: 48px;
	}

	@media ${media.minDesktop} {
		/* width: calc(100% - 240px); */
		padding-top: 56px;
	}
`;

export const NavigationLink = styled(NavLink)`
	font: var(--font-body-mobile);
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