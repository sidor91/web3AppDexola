import {
	RoutingSection,
	NavigationLink,
	Container,
	LinkText,
	LinkTextActive,
} from "./Routing.styled";

function defineTextStyle(isActive, text) {
	return (
		<>
			{isActive ? (
				<LinkTextActive>{text}</LinkTextActive>
			) : (
				<LinkText>{text}</LinkText>
			)}
		</>
	);
}

function Routing() {
	return (
		<Container>
			<RoutingSection>
				<NavigationLink to="stake">
					{({ isActive }) => defineTextStyle(isActive, "Stake")}
				</NavigationLink>
				<NavigationLink to="withdraw">
					{({ isActive }) => defineTextStyle(isActive, "Withdraw")}
				</NavigationLink>
				<NavigationLink to="rewards">
					{({ isActive }) => defineTextStyle(isActive, "Claim rewards")}
				</NavigationLink>
			</RoutingSection>
		</Container>
	);
}

export default Routing;
