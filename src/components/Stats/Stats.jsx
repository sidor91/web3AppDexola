import {
	Container,
	SubContainer,
	ValueContainer,
	Value,
	Units,
	Description,
	DescriptionContainer,
	IconHelper,
	TooltipLink,
	TooltipContainer,
} from "./Stats.styled";
import useStats from "@/utils/hooks/useStats";
import helpIcon from "@/assets/helpIcon.svg";
import DraggableTooltip from "@/components/Tooltip/Tooltip.jsx";
import { useState } from "react";
import useWindowDimensions from "@/utils/hooks/useWindowDimensions";
import { Tooltip } from "react-tooltip";

function Stats() {
	const [isTooltipShown, setIsTooltipShown] = useState(false);
	const [tooltipId, setTooltipId] = useState('')
	const statsArray = useStats();
	const dimensions = useWindowDimensions();

	const handleTooltipClick = (index) => {
		setIsTooltipShown(true);
		setTooltipId(index);
	}

	return (
		<Container>
			{statsArray.map(({ value, units, description, helperText }, index) => (
				<SubContainer key={index}>
					<ValueContainer>
						<Value>{value || 0}</Value>
						{units && <Units>{units}</Units>}
					</ValueContainer>
					{helperText && (
						<TooltipContainer>
							{dimensions < 1440 && (
								<>
									<IconHelper
										src={helpIcon}
										alt="info"
										onClick={() => {
											handleTooltipClick(index);
										}}
									/>
									{isTooltipShown && tooltipId === index && (
										<DraggableTooltip
											id={index}
											title={description}
											description={helperText}
											isShown={isTooltipShown}
											setIsShown={setIsTooltipShown}
										/>
									)}
								</>
							)}
							{dimensions >= 1440 && (
								<>
									<TooltipLink
										data-tooltip-id="my-tooltip"
										data-tooltip-content={helperText}
									>
										<IconHelper src={helpIcon} />
									</TooltipLink>
								</>
							)}
						</TooltipContainer>
					)}
					<DescriptionContainer>
						<Description>{description}</Description>
					</DescriptionContainer>
				</SubContainer>
			))}
			<Tooltip id="my-tooltip" style={{backgroundColor: 'white', color: 'black'}}/>
		</Container>
	);
}

export default Stats;
