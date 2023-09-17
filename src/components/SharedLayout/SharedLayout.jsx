import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Fallback from "@/components/Fallback/Fallback";
import InformationSection from "@/components/InformationSection/InformationSection";
import { BackgroundContainer } from "./SharedLayout.styled";

function SharedLayout() {
	return (
		<>
			<BackgroundContainer>
				<Header />
				<InformationSection />
			</BackgroundContainer>
			<main>
				<Suspense fallback={<Fallback />}>
					<Outlet />
				</Suspense>
			</main>
			<Footer />
		</>
	);
}

export default SharedLayout;
