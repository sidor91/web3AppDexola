import styled from "styled-components";
import { media } from "@/utils/mediaRules";

export const Container = styled.div`
max-width: 100vw;
min-height: 100vh;
display: flex;
flex-direction: column;
overflow-x: hidden;
`;


export const BackgroundContainer = styled.div`
	position: sticky;
	top: 0;
	z-index: 88;
	background: radial-gradient(
		42.93% 42.93% at 50% 50%,
		#2f4bc9 0%,
		#080808 100%
	);
	background-size: 2860px 1548px;
	background-position-y: -300px;
	background-position-x: center;
	
	@media ${media.minTablet} {
		background-size: 1467px 825px;
		background-position-y: 1500px;
	}

	@media ${media.minDesktop} {
		background-size: 2193px 1330px;
		background-position-y: -300px;
	}
`;