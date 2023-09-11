import { Container, Header, Section } from "./InformationSection.styled";
import Routing from "@/components/Routing/Routing";
import Table from '@/components/InformationSection/Table/Table';

function InformationSection() {
    return (
			<Section>
				<Container>
                <Header>StarRunner Token staking</Header>
                <Table/>
				</Container>
				<Routing />
			</Section>
		);
}

export default InformationSection;