import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import Fallback from "@/components/Fallback/Fallback";

const StakePage = lazy(() => import("@/pages/StakePage"));
const WithdrawPage = lazy(() => import("@/pages/WithdrawPage"));
const RewardsPage = lazy(() => import("@/pages/RewardsPage"));
const SharedLayout = lazy(() =>
	import("@/components/SharedLayout/SharedLayout")
);

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navigate to="/stake" />} />
				<Route
					path="/"
					element={
						<Suspense fallback={<Fallback />}>
							<SharedLayout />
						</Suspense>
					}
				>
						<Route path="stake" element={<StakePage />} />
						<Route path="withdraw" element={<WithdrawPage />} />
						<Route path="rewards" element={<RewardsPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
