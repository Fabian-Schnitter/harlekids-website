import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Termine from "./pages/Termine";
import Zirkuspaedagogik from "./pages/Zirkuspaedagogik";
import Jugendzirkus from "./pages/Jugendzirkus";
import Ferien from "./pages/Ferien";
import Herberge from "./pages/Herberge";
import Kontakt from "./pages/Kontakt";
import Blog from "./pages/Blog";
import "./App.css";

function App() {
	return (
		<Router>
			<div className="flex flex-col min-h-screen">
				<Navbar />
				<main className="flex-grow">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/termine" element={<Termine />} />
						<Route path="/zirkuspaedagogik" element={<Zirkuspaedagogik />} />
						<Route path="/jugendzirkus" element={<Jugendzirkus />} />
						<Route path="/ferien" element={<Ferien />} />
						<Route path="/herberge" element={<Herberge />} />
						<Route path="/kontakt" element={<Kontakt />} />
						<Route path="/blog" element={<Blog />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
