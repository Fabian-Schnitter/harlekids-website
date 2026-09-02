import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();

	const navItems = [
		{ name: "Start", path: "/" },
		{ name: "Termine", path: "/termine" },
		{ name: "Zirkuspädagogik", path: "/zirkuspaedagogik" },
		{ name: "Jugendzirkus", path: "/jugendzirkus" },
		{ name: "Ferien", path: "/ferien" },
		{ name: "Herberge", path: "/herberge" },
		{ name: "Blog", path: "/blog" },
		{ name: "Kontakt", path: "/kontakt" },
	];

	const isActive = (path) => {
		return location.pathname === path;
	};

	return (
		<nav className="bg-white shadow-lg sticky top-0 z-50">
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center py-4">
					{/* Logo */}
					<Link to="/" className="flex items-center gap-3" aria-label="Harlekids – Startseite">
						<div
							className="h-14 w-14 shrink-0 bg-no-repeat"
							style={{
								backgroundImage:
									'url("https://www.zpz-harlekids.de/wp-content/themes/harlekids2010/images/head_center.jpg")',
								backgroundSize: "317px auto",
								backgroundPosition: "-239px top",
							}}
						/>
						<div className="leading-tight">
							<div className="text-2xl font-bold text-circus-red">Harlekids</div>
							<div className="text-xs text-circus-blue">Zirkuspädagogisches Zentrum</div>
						</div>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden lg:flex space-x-1">
						{navItems.map((item) => (
							<Link
								key={item.path}
								to={item.path}
								className={`px-4 py-2 rounded-lg transition-all duration-300 ${
									isActive(item.path)
										? "bg-circus-red text-white"
										: "text-gray-700 hover:bg-circus-yellow hover:text-gray-900"
								}`}
							>
								{item.name}
							</Link>
						))}
					</div>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="lg:hidden text-gray-700 hover:text-circus-red transition-colors"
						aria-label="Toggle menu"
					>
						{isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
					</button>
				</div>

				{/* Mobile Navigation */}
				{isOpen && (
					<div className="lg:hidden pb-4">
						{navItems.map((item) => (
							<Link
								key={item.path}
								to={item.path}
								onClick={() => setIsOpen(false)}
								className={`block px-4 py-3 rounded-lg mb-2 transition-all duration-300 ${
									isActive(item.path)
										? "bg-circus-red text-white"
										: "text-gray-700 hover:bg-circus-yellow"
								}`}
							>
								{item.name}
							</Link>
						))}
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
