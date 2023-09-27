import styled from "styled-components";
import { media } from "@/utils/mediaRules";
import mobileBackground from "@/assets/mobile_background.webp";
import tabletBackground from "@/assets/tablet_background.webp";
import desktopBackground from "@/assets/desktop_background.webp";

export const Container = styled.div`
	width: 100%;
	min-width: var(--width-mobile);
	max-width: 100%;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	background-color: var(--color-black);

	@media ${media.minDesktop} {
		background: radial-gradient(
			42.93% 42.93% at 50% 50%,
			#2f4bc9 0%,
			#000000 100%
		);
		background-position-y: 525px;
		background-position-x: center;
		background-size: 2193px 1330px;
		background-repeat: no-repeat;
	}
`;



export const BackgroundContainer = styled.div`
	position: sticky;
	top: 0;
	z-index: 88;
	background-size: 2860px 1548px;
	background-image: url(${mobileBackground});
	background-position-x: center;
	background-position-y: top;
	overflow: hidden;

	@media ${media.minTablet} {
		background-image: url(${tabletBackground});
		background-size: 1467px 825px;
	}

	@media ${media.minDesktop} {
		background-image: url(${desktopBackground});
		background-position-y: -31px;
		background-size: 2193px 1330px;
	}
`;