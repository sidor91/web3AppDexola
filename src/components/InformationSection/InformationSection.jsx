
import { Container, Header, Section } from "./InformationSection.styled";
import Routing from "@/components/Routing/Routing";

function InformationSection() {
    return (
			<Section>
				<Container>
					<Header>StarRunner Token staking</Header>
				</Container>
				<Routing />
			</Section>
		);
}

export default InformationSection;