import { Link } from "react-router-dom";
import {
	FaFacebook,
	FaInstagram,
	FaEnvelope,
	FaPhone,
	FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="bg-gray-900 text-white">
			<div className="container mx-auto px-4 py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* About Section */}
					<div>
						<h3 className="text-2xl font-bold text-circus-yellow mb-4">
							Harlekids
						</h3>
						<p className="text-gray-300 mb-4">
							Zirkuspädagogisches Zentrum für Kinder und Jugendliche in
							Brandenburg
						</p>
						<div className="flex space-x-4">
							<a
								href="https://facebook.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-300 hover:text-circus-yellow transition-colors"
								aria-label="Facebook"
							>
								<FaFacebook size={24} />
							</a>
							<a
								href="https://instagram.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-300 hover:text-circus-yellow transition-colors"
								aria-label="Instagram"
							>
								<FaInstagram size={24} />
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h4 className="text-lg font-semibold mb-4 text-circus-yellow">
							Schnellzugriff
						</h4>
						<ul className="space-y-2">
							<li>
								<Link
									to="/"
									className="text-gray-300 hover:text-circus-yellow transition-colors"
								>
									Start
								</Link>
							</li>
							<li>
								<Link
									to="/termine"
									className="text-gray-300 hover:text-circus-yellow transition-colors"
								>
									Termine
								</Link>
							</li>
							<li>
								<Link
									to="/jugendzirkus"
									className="text-gray-300 hover:text-circus-yellow transition-colors"
								>
									Jugendzirkus
								</Link>
							</li>
							<li>
								<Link
									to="/ferien"
									className="text-gray-300 hover:text-circus-yellow transition-colors"
								>
									Zirkusferien
								</Link>
							</li>
						</ul>
					</div>

					{/* Angebote */}
					<div>
						<h4 className="text-lg font-semibold mb-4 text-circus-yellow">
							Angebote
						</h4>
						<ul className="space-y-2">
							<li>
								<Link
									to="/zirkuspaedagogik"
									className="text-gray-300 hover:text-circus-yellow transition-colors"
								>
									Zirkuspädagogik
								</Link>
							</li>
							<li>
								<Link
									to="/ferien"
									className="text-gray-300 hover:text-circus-yellow transition-colors"
								>
									Ferienprogramm
								</Link>
							</li>
							<li>
								<Link
									to="/herberge"
									className="text-gray-300 hover:text-circus-yellow transition-colors"
								>
									Jugendherberge
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact Info */}
					<div>
						<h4 className="text-lg font-semibold mb-4 text-circus-yellow">
							Kontakt
						</h4>
						<ul className="space-y-3">
							<li className="flex items-start space-x-3">
								<FaMapMarkerAlt className="text-circus-yellow mt-1 flex-shrink-0" />
								<span className="text-gray-300">
									Zirkuspädagogisches Zentrum Harlekids
									<br />
									Brandenburg
								</span>
							</li>
							<li className="flex items-center space-x-3">
								<FaPhone className="text-circus-yellow flex-shrink-0" />
								<a
									href="tel:+49123456789"
									className="text-gray-300 hover:text-circus-yellow transition-colors"
								>
									+49 (0) XXX XXXXXX
								</a>
							</li>
							<li className="flex items-center space-x-3">
								<FaEnvelope className="text-circus-yellow flex-shrink-0" />
								<a
									href="mailto:info@zpz-harlekids.de"
									className="text-gray-300 hover:text-circus-yellow transition-colors"
								>
									info@zpz-harlekids.de
								</a>
							</li>
						</ul>
					</div>
				</div>

				{/* Unterstützer Section */}
				<div className="mt-12 pt-8 border-t border-gray-700">
					<h4 className="text-lg font-semibold mb-6 text-circus-yellow text-center">
						Mit freundlicher Unterstützung von:
					</h4>
					<div className="flex flex-wrap justify-center items-center gap-8">
						{/* CMS NOTE: Diese Logos sollten über das CMS verwaltbar sein */}
						<div className="text-gray-400 text-sm">
							Landkreis Oberspreewald-Lausitz
						</div>
						<div className="text-gray-400 text-sm">Zirkus macht stark</div>
						<div className="text-gray-400 text-sm">BMBF</div>
						<div className="text-gray-400 text-sm">Kultur macht stark</div>
					</div>
				</div>

				{/* Copyright */}
				<div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
					<p>
						&copy; {new Date().getFullYear()} Harlekids e.V. Alle Rechte
						vorbehalten.
					</p>
					<div className="mt-2 space-x-4">
						<Link
							to="/impressum"
							className="hover:text-circus-yellow transition-colors"
						>
							Impressum
						</Link>
						<Link
							to="/datenschutz"
							className="hover:text-circus-yellow transition-colors"
						>
							Datenschutz
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
