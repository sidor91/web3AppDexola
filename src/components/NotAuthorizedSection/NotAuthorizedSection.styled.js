import styled from "styled-components";
import { media } from "@/utils/mediaRules";
import { Paragraph, StyledButton } from "@/components/SharedElements.styled";


export const Container = styled.div`
	padding-top: 149px;
	padding-bottom: 65px;
    display: flex;
    flex-direction: column;
    align-items: center;

	@media ${media.minTablet} {
		padding: 63px 39px;
    }

    @media ${media.minDesktop} {
		padding-left: 321px;
        padding-right: 321px;
	}
`;

export const Icon = styled.img`
margin: 0 auto 16px;

`

export const Text = styled(Paragraph)`
	text-align: center;
	margin-bottom: 110px;

	@media ${media.minTablet} {
		margin-bottom: 32px;
	}
`;

export const Button = styled(StyledButton)`
	width: 100%;
	padding: 12px 40px;

	@media ${media.minTablet} {
		width: fit-content;
	}
`;

