import { Container, Header, Section } from "./InformationSection.styled";
import Routing from "@/components/Routing/Routing";
import Stats from "@/components/InformationSection/Stats/Stats";

function InformationSection() {
    return (
		<Section
		>
				<Container>
					<Header>StarRunner Token staking</Header>
					<Stats />
				</Container>
				<Routing />
			</Section>
		);
}

export default InformationSection;