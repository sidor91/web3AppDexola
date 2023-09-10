import { RoutingSection, NavigationLink, Container } from "./Routing.styled";
import { useLocation } from "react-router-dom";

function Routing() {
    const { pathname } = useLocation()

	return (
		<Container>
			<RoutingSection>
				<NavigationLink to="stake" $isactive={pathname === "/stake"}>
					Stake
				</NavigationLink>
				<NavigationLink to="withdraw" $isactive={pathname === "/withdraw"}>
					Withdraw
				</NavigationLink>
				<NavigationLink to="rewards" $isactive={pathname === "/rewards"}>
					Claim rewards
				</NavigationLink>
			</RoutingSection>
		</Container>
	);
}

export default Routing;
