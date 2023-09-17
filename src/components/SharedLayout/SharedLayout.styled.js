import styled from "styled-components";
import { media } from "@/utils/mediaRules";
import topBackgroundMobile from "@/assets/topBackgroundMobile.webp";
import topBackgroundTablet from "@/assets/topBackgroundTablet.webp";
import topBackgroundWeb from "@/assets/topBackgroundDesktop.webp";

// export const Container = styled.div`

// `;

// export const Main = styled.main`
// 	background-color: var(--color-black);
// `;

export const BackgroundContainer = styled.div`
	position: sticky;
	top: 0;
	z-index: 88;
	background-image: url(${topBackgroundMobile});
/* 
	border-radius: 2193px;
	background: radial-gradient(
		42.93% 42.93% at 50% 50%,
		#2f4bc9 0%,
		#080808 100%
	);
	background-size: 2860px 1548px;
    background-position: bottom;
    background-repeat: no-repeat; */
    

	@media ${media.minTablet} {
		background-image: url(${topBackgroundTablet});
	}

	@media ${media.minDesktop} {
		background-image: url(${topBackgroundWeb});
	}
`;