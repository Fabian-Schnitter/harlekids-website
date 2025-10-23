import { useState } from "react";
import Section from "../components/Section";
import Button from "../components/Button";
import {
	FaEnvelope,
	FaPhone,
	FaMapMarkerAlt,
	FaFacebook,
	FaInstagram,
	FaClock,
} from "react-icons/fa";

// CMS NOTE: Kontaktdaten aus CMS verwalten

const Kontakt = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		subject: "",
		message: "",
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// CMS NOTE: Hier später Formular-Submission an Backend/CMS
		console.log("Form submitted:", formData);
		alert("Vielen Dank für Ihre Nachricht! Wir melden uns bald bei Ihnen.");
		// Reset form
		setFormData({
			name: "",
			email: "",
			phone: "",
			subject: "",
			message: "",
		});
	};

	return (
		<div className="min-h-screen">
			{/* Hero */}
			<Section backgroundColor="blue" className="text-white text-center py-20">
				<FaEnvelope className="text-6xl mb-6 mx-auto" />
				<h1 className="text-5xl md:text-6xl font-bold mb-6">Kontakt</h1>
				<p className="text-xl max-w-3xl mx-auto">
					Haben Sie Fragen, Wünsche oder Anregungen? Wir freuen uns auf Ihre
					Nachricht!
				</p>
			</Section>

			{/* Kontaktformular & Info */}
			<Section>
				<div className="max-w-6xl mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
						{/* Kontaktformular */}
						<div>
							<h2 className="text-3xl font-bold mb-6 text-gray-900">
								Schreiben Sie uns
							</h2>
							<form onSubmit={handleSubmit} className="space-y-6">
								<div>
									<label
										htmlFor="name"
										className="block text-gray-700 font-semibold mb-2"
									>
										Name *
									</label>
									<input
										type="text"
										id="name"
										name="name"
										value={formData.name}
										onChange={handleChange}
										required
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-circus-red"
									/>
								</div>

								<div>
									<label
										htmlFor="email"
										className="block text-gray-700 font-semibold mb-2"
									>
										E-Mail *
									</label>
									<input
										type="email"
										id="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										required
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-circus-red"
									/>
								</div>

								<div>
									<label
										htmlFor="phone"
										className="block text-gray-700 font-semibold mb-2"
									>
										Telefon (optional)
									</label>
									<input
										type="tel"
										id="phone"
										name="phone"
										value={formData.phone}
										onChange={handleChange}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-circus-red"
									/>
								</div>

								<div>
									<label
										htmlFor="subject"
										className="block text-gray-700 font-semibold mb-2"
									>
										Betreff *
									</label>
									<select
										id="subject"
										name="subject"
										value={formData.subject}
										onChange={handleChange}
										required
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-circus-red"
									>
										<option value="">Bitte wählen...</option>
										<option value="jugendzirkus">Jugendzirkus</option>
										<option value="ferien">Zirkusferien</option>
										<option value="fortbildung">Fortbildung</option>
										<option value="herberge">Jugendherberge</option>
										<option value="schulprojekt">Schulprojekt</option>
										<option value="sonstiges">Sonstiges</option>
									</select>
								</div>

								<div>
									<label
										htmlFor="message"
										className="block text-gray-700 font-semibold mb-2"
									>
										Ihre Nachricht *
									</label>
									<textarea
										id="message"
										name="message"
										value={formData.message}
										onChange={handleChange}
										required
										rows="6"
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-circus-red resize-none"
									></textarea>
								</div>

								<div>
									<Button
										type="submit"
										variant="primary"
										size="lg"
										className="w-full"
									>
										Nachricht senden
									</Button>
								</div>

								<p className="text-sm text-gray-600">
									* Pflichtfelder. Ihre Daten werden vertraulich behandelt und
									nicht an Dritte weitergegeben.
								</p>
							</form>
						</div>

						{/* Kontaktinformationen */}
						<div>
							<h2 className="text-3xl font-bold mb-6 text-gray-900">
								Kontaktinformationen
							</h2>

							<div className="space-y-6 mb-8">
								<div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
									<FaMapMarkerAlt className="text-circus-red text-2xl mt-1 flex-shrink-0" />
									<div>
										<h3 className="font-bold text-gray-900 mb-1">Adresse</h3>
										<p className="text-gray-700">
											Zirkuspädagogisches Zentrum Harlekids
											<br />
											[Straße & Hausnummer]
											<br />
											[PLZ] [Ort]
											<br />
											Deutschland
										</p>
									</div>
								</div>

								<div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
									<FaPhone className="text-circus-red text-2xl mt-1 flex-shrink-0" />
									<div>
										<h3 className="font-bold text-gray-900 mb-1">Telefon</h3>
										<a
											href="tel:+49123456789"
											className="text-gray-700 hover:text-circus-red transition-colors"
										>
											+49 (0) XXX XXXXXX
										</a>
									</div>
								</div>

								<div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
									<FaEnvelope className="text-circus-red text-2xl mt-1 flex-shrink-0" />
									<div>
										<h3 className="font-bold text-gray-900 mb-1">E-Mail</h3>
										<a
											href="mailto:info@zpz-harlekids.de"
											className="text-gray-700 hover:text-circus-red transition-colors"
										>
											info@zpz-harlekids.de
										</a>
									</div>
								</div>

								<div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
									<FaClock className="text-circus-red text-2xl mt-1 flex-shrink-0" />
									<div>
										<h3 className="font-bold text-gray-900 mb-2">Bürozeiten</h3>
										<div className="space-y-1 text-gray-700">
											<p>Montag - Freitag: 9:00 - 17:00 Uhr</p>
											<p className="text-sm text-gray-600">
												In den Schulferien können die Zeiten abweichen
											</p>
										</div>
									</div>
								</div>
							</div>

							{/* Social Media */}
							<div className="bg-circus-yellow p-6 rounded-lg">
								<h3 className="text-xl font-bold mb-4">Folgt uns!</h3>
								<p className="text-gray-900 mb-4">
									Bleibt auf dem Laufenden mit News, Bildern und Updates aus der
									Harlekids-Welt:
								</p>
								<div className="flex space-x-4">
									<a
										href="https://facebook.com"
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-circus-blue hover:bg-circus-blue hover:text-white transition-all"
									>
										<FaFacebook size={24} />
									</a>
									<a
										href="https://instagram.com"
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-circus-red hover:bg-circus-red hover:text-white transition-all"
									>
										<FaInstagram size={24} />
									</a>
								</div>
							</div>

							{/* Anfahrt Hinweis */}
							<div className="mt-6 bg-gray-50 p-6 rounded-lg">
								<h3 className="text-xl font-bold mb-2">Anfahrt</h3>
								<p className="text-gray-700 mb-4">
									Eine detaillierte Anfahrtsbeschreibung finden Sie auf unserer{" "}
									<a href="#karte" className="text-circus-red hover:underline">
										Karte unten
									</a>
									.
								</p>
							</div>
						</div>
					</div>
				</div>
			</Section>

			{/* Karte */}
			<Section id="karte" title="So finden Sie uns" backgroundColor="gray">
				<div className="max-w-6xl mx-auto">
					{/* CMS NOTE: Google Maps Embed hier einfügen */}
					<div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center mb-6">
						<p className="text-gray-600">[Hier Google Maps Karte einbinden]</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-bold mb-3 text-circus-red">
								Mit dem Auto
							</h3>
							<p className="text-gray-700">
								Über die [Autobahn] Abfahrt [Name], dann Richtung [Ort]. Folgen
								Sie der Beschilderung. Ausreichend Parkplätze vorhanden.
							</p>
						</div>

						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-bold mb-3 text-circus-red">
								Öffentliche Verkehrsmittel
							</h3>
							<p className="text-gray-700">
								Bus-Linie [Nummer] bis Haltestelle "[Name]" (5 Min. Fußweg). Vom
								Bahnhof [Ort] mit dem Bus ca. 15 Minuten.
							</p>
						</div>
					</div>
				</div>
			</Section>

			{/* FAQ Quick Links */}
			<Section
				title="Häufige Fragen"
				subtitle="Vielleicht finden Sie hier schon die Antwort"
			>
				<div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
						<h3 className="text-lg font-bold mb-2 text-circus-red">
							Wie kann ich mein Kind anmelden?
						</h3>
						<p className="text-gray-700 mb-4">
							Kontaktieren Sie uns per E-Mail oder Telefon. Wir vereinbaren
							gerne einen kostenlosen Schnuppertermin.
						</p>
					</div>

					<div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
						<h3 className="text-lg font-bold mb-2 text-circus-red">
							Braucht mein Kind Vorkenntnisse?
						</h3>
						<p className="text-gray-700 mb-4">
							Nein! Bei uns ist jede*r willkommen – egal ob Anfänger*in oder
							Fortgeschritten.
						</p>
					</div>

					<div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
						<h3 className="text-lg font-bold mb-2 text-circus-red">
							Was kostet die Mitgliedschaft?
						</h3>
						<p className="text-gray-700 mb-4">
							30€ pro Monat für die Teilnahme am Jugendzirkus. Ermäßigungen sind
							möglich.
						</p>
					</div>

					<div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
						<h3 className="text-lg font-bold mb-2 text-circus-red">
							Gibt es Schnuppertrainings?
						</h3>
						<p className="text-gray-700 mb-4">
							Ja! Das erste Schnuppertraining ist kostenlos. Einfach Termin
							vereinbaren.
						</p>
					</div>
				</div>
			</Section>
		</div>
	);
};

export default Kontakt;
