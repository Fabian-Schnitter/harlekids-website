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

	const isActive = (path) => {
		return location.pathname === path;
	};

	return (
		<nav className="circus-navbar sticky top-0 z-50">
			<div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-10">
				<div className="flex min-h-20 justify-between items-center gap-6 py-1 sm:min-h-24">
					{/* Logo */}
					<Link to="/" className="circus-brand shrink-0" aria-label="Harlekids – Startseite">
						<img
							src="/images/harlekids-navbar.jpg"
							alt="Harlekids – Zirkuspädagogisches Zentrum"
							width="620"
							height="180"
							className="h-16 w-auto sm:h-20"
						/>
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
