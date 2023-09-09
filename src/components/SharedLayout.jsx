import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Routing from "@/components/Routing/Routing";
import Fallback from "@/components/Fallback/Fallback";

function SharedLayout() {
    return (
			<>
				<Header />
				<main>
					<Routing />
					<Suspense fallback={<Fallback />}>
						<Outlet />
					</Suspense>
				</main>
				<Footer />
			</>
		);
}

export default SharedLayout;
