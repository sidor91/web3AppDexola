import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import Fallback from "@/components/Fallback/Fallback";

const OperationsSection = lazy(() =>
	import("@/components/OperationsSection/OperationsSection")
);
const SharedLayout = lazy(() => import("@/components/SharedLayout"));

function App() {
	return (
		<Suspense fallback={<Fallback />}>
			<BrowserRouter basename="/stake">
				<Routes>
					<Route path="/" element={<Navigate to="/stake" />} />
					<Route path="/" element={<SharedLayout />}>
						<Route path="stake" element={<OperationsSection />} />
						<Route path="withdraw" element={<OperationsSection />} />
						<Route path="rewards" element={<OperationsSection />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</Suspense>
	);
}

export default App;
