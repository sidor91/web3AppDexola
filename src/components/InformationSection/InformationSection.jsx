import { Container, Header, Section } from "./InformationSection.styled";
import Routing from "@/components/Routing/Routing";
import Stats from "@/components/Stats/Stats";
import useWindowDimensions from "@/utils/hooks/useWindowDimensions.js";

function InformationSection() {
	const dimensions = useWindowDimensions();
	return (
		<Section>
			<Container>
				<Header>StarRunner Token staking</Header>
				<Stats />
			</Container>
			{dimensions < 1440 && <Routing />}
		</Section>
	);
}

export default InformationSection;
