import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Fallback from "@/components/Fallback/Fallback";
import InformationSection from "@/components/InformationSection/InformationSection";
import {
	BackgroundContainer,
	Container,
} from "./SharedLayout.styled";
import Routing from "@/components/Routing/Routing";
import useWindowDimensions from "@/utils/hooks/useWindowDimensions.js";

function SharedLayout() {
	const dimensions = useWindowDimensions();
	return (
		<Container>
			<BackgroundContainer>
				<Header />
				<InformationSection />
			</BackgroundContainer>
				{dimensions >= 1440 && <Routing />}
				<main>
					<Suspense fallback={<Fallback />}>
						<Outlet />
					</Suspense>
				</main>
				<Footer />
		</Container>
	);
}

export default SharedLayout;
