import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Fallback from "@/components/Fallback/Fallback";
import InformationSection from "@/components/InformationSection/InformationSection";

function SharedLayout() {
	return (
		<>
			<Header />
			<main>
				<InformationSection />
				<Suspense fallback={<Fallback />}>
					<Outlet />
				</Suspense>
			</main>
			<Footer />
		</>
	);
}

export default SharedLayout;
