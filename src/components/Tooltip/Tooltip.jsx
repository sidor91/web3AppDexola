import { useEffect, useState } from "react";
import {
	Container,
	SubContainer,
	Graber,
	Title,
	Description,
} from "./Tooltip.styled";
// import Draggable from "react-draggable";

function DraggableTooltip({ title, description, setIsShown, isShown }) {
	const [isTooltipShown, setIsToolTipShown] = useState(true);

	const handleClose = (e) => {
		e.preventDefault();
		setIsToolTipShown(false);
		setTimeout(() => {
			setIsShown(false);
		}, 500);
	};

	return (
		<>
			{isShown && (
				<Container
					onClick={(e) => {
						handleClose(e);
					}}
				>
					<SubContainer
						// draggable={true}
						// onDragStart={(e) => {
						// 	handleClose(e);
						// }}
						$isshown={isTooltipShown}
					>
						<Graber></Graber>
						<Title>{title}</Title>
						<Description>{description}</Description>
					</SubContainer>
				</Container>
			)}
		</>
	);
}

export default DraggableTooltip;
