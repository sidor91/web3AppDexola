import styled from "styled-components";
import { media } from "@/utils/mediaRules";
import { StyledButton, Paragraph } from "@/components/SharedElements.styled";

export const StyledForm = styled.form`
display: flex;
flex-direction: column;
padding-top: 32px;
`;

export const InputContainer = styled.div`
position: relative;
width: 100%;
`

export const Input = styled.input`
	width: 100%;
	border: none;
	background-color: transparent;
	padding-bottom: 8px;
	margin-bottom: 34px;
	font: var(--font-input-mobile);
	color: var(--color-white);
	border-bottom-width: 1px;
	border-bottom-style: solid;
	border-bottom-color: ${(props) =>
		props.$iserror ? `var(--color-warning-rose)` : `{var(--color-white)}`};

	&[type="number"] {
		appearance: textfield;
	}

	&:focus {
		outline: none;
	}

	&::-webkit-inner-spin-button,
	&::-webkit-outer-spin-button {
		-webkit-appearance: none;
		appearance: none;
		margin: 0;
	}

	@media ${media.minTablet} {
		font: var(--font-input-tablet);
		margin-bottom: 38px;
		width: 391px;
	}

	@media ${media.minDesktop} {
		font: var(--font-input-web);
		padding-bottom: 10px;
	}

	&::placeholder {
		font: var(--font-body-mobile);
		color: var(--color-light-grey);
		line-height: 1.7;

		@media ${media.minTablet} {
			font: var(--font-body-tablet-web);
			line-height: 1.5;
		}
	}
`;

export const InputErrorMessage = styled.span`
	position: absolute;
	bottom: 6px;
	left: 0;
	color: var(--color-warning-rose);
`;

export const Label = styled.label`
	margin-bottom: 224px;

	@media ${media.minTablet} {
		margin-bottom: 62px;
	}
`;

export const LabelText = styled.span`
	margin-right: 4px;
	display: inline-flex;
	font: var(--font-body-mobile);
	color: var(--color-light-grey);

	@media ${media.minTablet} {
		font: var(--font-body-tablet-web);
	}
`;

export const LabelValue = styled.span`
	display: inline-flex;
	margin-right: 4px;
	font: var(--font-available-value-mobile);

	@media ${media.minTablet} {
		font: var(--font-available-value-tablet-web);
	}
`;

export const LabelUnits = styled.span`
	display: inline-flex;
	font: var(--font-available-units-mobile);

	@media ${media.minTablet} {
		font: var(--font-available-units-tablet-web);
	}
`;

export const SubmitButton = styled(StyledButton)`
	padding-top: 12px;
	padding-bottom: 12px;
	line-height: 1.5;
	margin-bottom: 56px;

	@media ${media.minTablet} {
		padding: 12px 40px;
		width: fit-content;
		margin-bottom: 32px;
	}
`;

export const OperationStatusContainer = styled.div`
	position: absolute;
	bottom: 136px;
	left: 50%;
	transform: translateX(-50%);
	width: 100%;

	display: flex;
	gap: 16px;
	justify-content: center;
	align-items: center;

	@media ${media.minTablet} {
		width: fit-content;
		bottom: -340px;
		left: unset;
		transform: unset;
		right: 0;
	}

	@media ${media.minDesktop} {
		bottom: -80px;
		right: -69px;
	}
`;