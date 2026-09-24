import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();

	const navItems = [
		{ name: "Start", path: "/" },
		{ name: "Termine", path: "/termine" },
		{ name: "Kurse", path: "/jugendzirkus" },
		{ name: "Ferien", path: "/ferien" },
		{ name: "Herberge", path: "/herberge" },
		{ name: "Blog", path: "/blog" },
		{ name: "Kontakt", path: "/kontakt" },
	];

	const isActive = (path) => location.pathname === path;

	return (
		<nav className="circus-navbar sticky top-0 z-50" aria-label="Hauptnavigation">
			<div className="circus-navbar-inner mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-10">
				<Link to="/" className="circus-brand-panel" aria-label="Harlekids – Startseite">
					<img
						src="/images/harlekids-logo.jpg"
						alt="Harlekids – Zirkuspädagogisches Zentrum"
						width="499"
						height="318"
					/>
				</Link>

				<div className="hidden lg:flex items-center gap-1">
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

				<button
					type="button"
					onClick={() => setIsOpen((open) => !open)}
					className="mobile-menu-button lg:hidden"
					aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
					aria-expanded={isOpen}
				>
					{isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
				</button>
			</div>

			{isOpen && (
				<div className="mobile-navigation lg:hidden">
					{navItems.map((item) => (
						<Link
							key={item.path}
							to={item.path}
							onClick={() => setIsOpen(false)}
							className={isActive(item.path) ? "is-active" : ""}
						>
							{item.name}
						</Link>
					))}
				</div>
			)}
		</nav>
	);
};

export default Navbar;
