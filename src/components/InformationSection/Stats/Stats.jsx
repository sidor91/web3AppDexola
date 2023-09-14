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

function Stats() {
    const stats = useStats();
	return (
		<Container>
			{stats.map(({ value, units, description, helperText }, index) => (
				<SubContainer key={index}>
					<ValueContainer>
						<Value>{value}</Value>
						{units && <Units>{units}</Units>}
					</ValueContainer>
					{helperText && <IconHelper src={helpIcon} />}
					<DescriptionContainer>
						<Description>{description}</Description>
					</DescriptionContainer>
				</SubContainer>
			))}
		</Container>
	);
}

export default Stats;
