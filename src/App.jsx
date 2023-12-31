import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import Fallback from "@/components/Fallback/Fallback";
import SharedLayout from "@/components/SharedLayout/SharedLayout";
const OperationsSection = lazy(() =>
	import("@/components/OperationsSection/OperationsSection")
);
// const SharedLayout = lazy(() =>
// 	import("@/components/SharedLayout/SharedLayout")
// );

function App() {
	return (
		<Suspense fallback={<Fallback />}>
			<BrowserRouter>
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
