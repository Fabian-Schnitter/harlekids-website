import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Navigate, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import "./App.css";

const Termine = lazy(() => import("./pages/Termine"));
const Jugendzirkus = lazy(() => import("./pages/Jugendzirkus"));
const Ferien = lazy(() => import("./pages/Ferien"));
const Herberge = lazy(() => import("./pages/Herberge"));
const Kontakt = lazy(() => import("./pages/Kontakt"));
const Blog = lazy(() => import("./pages/Blog"));
const Impressum = lazy(() =>
	import("./pages/Legal").then((module) => ({ default: module.Impressum })),
);
const Datenschutz = lazy(() =>
	import("./pages/Legal").then((module) => ({ default: module.Datenschutz })),
);

function App() {
	return (
		<Router>
			<ScrollToTop />
			<div className="flex flex-col min-h-screen">
				<Navbar />
				<main className="flex-grow">
					<Suspense fallback={<div className="min-h-[40vh]" aria-busy="true" />}>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/termine" element={<Termine />} />
							<Route path="/zirkuspaedagogik" element={<Navigate to="/" replace />} />
							<Route path="/jugendzirkus" element={<Jugendzirkus />} />
							<Route path="/ferien" element={<Ferien />} />
							<Route path="/herberge" element={<Herberge />} />
							<Route path="/kontakt" element={<Kontakt />} />
							<Route path="/blog" element={<Blog />} />
							<Route path="/impressum" element={<Impressum />} />
							<Route path="/datenschutz" element={<Datenschutz />} />
						</Routes>
					</Suspense>
				</main>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
