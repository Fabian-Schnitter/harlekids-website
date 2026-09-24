import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const navItems = [
	{ name: "Start", path: "/" },
	{ name: "Termine", path: "/termine" },
	{ name: "Kurse", path: "/jugendzirkus" },
	{ name: "Ferien", path: "/ferien" },
	{ name: "Herberge", path: "/herberge" },
	{ name: "Blog", path: "/blog" },
	{ name: "Kontakt", path: "/kontakt" },
];

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();
	const isActive = (path) => location.pathname === path;

	return (
		<header className="site-header">
			{/* Desktop: der originale Banner der früheren Website. */}
			<div className="legacy-header hidden lg:block">
				<img
					src="/images/harlekids-header.jpg"
					alt=""
					width="1024"
					height="345"
					className="legacy-header-image"
				/>
				<Link className="legacy-logo-link" to="/" aria-label="Harlekids – Startseite" />
				<nav className="legacy-navigation" aria-label="Hauptnavigation">
					{navItems.map((item) => (
						<Link
							key={item.path}
							to={item.path}
							className={isActive(item.path) ? "is-active" : ""}
						>
							{item.name}
						</Link>
					))}
				</nav>
			</div>

			{/* Mobil: vollständiges Logo statt eines beschnittenen Ausschnitts. */}
			<div className="mobile-header lg:hidden">
				<div className="mobile-header-row">
					<Link to="/" aria-label="Harlekids – Startseite">
						<img
							src="/images/harlekids-logo.jpg"
							alt="Harlekids – Zirkuspädagogisches Zentrum"
							width="499"
							height="318"
							className="mobile-logo"
						/>
					</Link>
					<button
						type="button"
						onClick={() => setIsOpen((open) => !open)}
						className="mobile-menu-button"
						aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
						aria-expanded={isOpen}
					>
						{isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
					</button>
				</div>

				{isOpen && (
					<nav className="mobile-navigation" aria-label="Hauptnavigation">
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
					</nav>
				)}
			</div>
		</header>
	);
};

export default Navbar;
