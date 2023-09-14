import {
	RoutingSection,
	NavigationLink,
	Container,
	LinkText,
	LinkTextActive,
} from "./Routing.styled";

function Routing() {
	return (
		<Container>
			<RoutingSection>
				<NavigationLink to="stake">
					{({ isActive }) =>
						isActive ? (
							<LinkTextActive>Stake</LinkTextActive>
						) : (
							<LinkText>Stake</LinkText>
						)
					}
				</NavigationLink>
				<NavigationLink to="withdraw">
					{({ isActive }) =>
						isActive ? (
							<LinkTextActive>Withdraw</LinkTextActive>
						) : (
							<LinkText>Withdraw</LinkText>
						)
					}
				</NavigationLink>
				<NavigationLink to="rewards">
					{({ isActive }) =>
						isActive ? (
							<LinkTextActive>Claim rewards</LinkTextActive>
						) : (
							<LinkText>Claim rewards</LinkText>
						)
					}
				</NavigationLink>
			</RoutingSection>
		</Container>
	);
}

export default Routing;
