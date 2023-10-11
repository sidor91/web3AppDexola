import styled, { keyframes, css } from "styled-components";
import { Paragraph } from "@/components/SharedElements.styled";

export const Container = styled.div`
	background: rgba(0, 0, 0, 0.6);
	width: 100%;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 998;
	display: flex;
`;

const slideInAnimation = keyframes`
    0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
`;

const slideOutAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
`;

export const SubContainer = styled.div`
	width: 100%;
	height: 275px;
	background-color: var(--color-white);
	z-index: 999;
	margin-top: auto;
	border-radius: 8px 8px 0px 0px;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-left: 16px;
	padding-right: 16px;
	${({ $isshown }) => {
		if ($isshown) {
			return css`
				animation: ${slideInAnimation} 0.5s ease-in;
			`;
		} else {
			return css`
				animation: ${slideOutAnimation} 0.5s ease-out;
			`;
		}
	}}
	animation-iteration-count: 1;
`;

export const SubContainerShown = styled.div``;

export const Graber = styled.div`
	width: 36px;
	height: 5px;
	margin-top: 8px;
	margin-bottom: 11px;
	border-radius: 2.5px;
	background-color: var(--color-grabber);
`;

export const Title = styled.h3`
	font: var(--font-tooltip-title-mobile-tablet);
	color: var(--color-black);
	z-index: 999;
	margin-bottom: 16px;
`;

export const Description = styled(Paragraph)`
	color: var(--color-black);
`;
