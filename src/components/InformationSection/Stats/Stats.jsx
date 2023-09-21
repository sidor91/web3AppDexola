import {
	Container,
	SubContainer,
	ValueContainer,
	Value,
	Units,
	Description,
	DescriptionContainer,
	IconHelper,
} from "./Stats.styled";
import useStats from "@/utils/hooks/useStats";
import helpIcon from "@/assets/helpIcon.svg";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

function Stats() {
	const { statsArray } = useStats();
	return (
		<Container>
			{statsArray.map(({ value, units, description, helperText }, index) => (
				<SubContainer key={index}>
					<ValueContainer>
						<Value>{value || 0}</Value>
						{units && <Units>{units}</Units>}
					</ValueContainer>
					{helperText && (
						<a data-tooltip-id="my-tooltip" data-tooltip-content={helperText}>
							<IconHelper src={helpIcon} />
						</a>
					)}
					<DescriptionContainer>
						<Description>{description}</Description>
					</DescriptionContainer>
				</SubContainer>
			))}
			<Tooltip id="my-tooltip" />
		</Container>
	);
}

export default Stats;
