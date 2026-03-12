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
	FaCheckCircle,
	FaExclamationCircle,
} from "react-icons/fa";

// WICHTIG: Diese URL später auf eure echte Domain ändern!
const API_URL = "https://harlekids.de/api/contact.php";

const Kontakt = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		subject: "",
		message: "",
		website: "", // Honeypot-Feld (Spam-Schutz)
	});

	const [status, setStatus] = useState({
		loading: false,
		success: false,
		error: null,
	});

	const [startTime] = useState(Date.now()); // Spam-Schutz: Zeit-Check

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Spam-Schutz 1: Honeypot - wenn "website" ausgefüllt ist, ist es ein Bot
		if (formData.website) {
			console.log("Spam detected: honeypot filled");
			return;
		}

		// Spam-Schutz 2: Zeit-Check - zu schnell = Bot (weniger als 3 Sekunden)
		const timeSpent = Date.now() - startTime;
		if (timeSpent < 3000) {
			setStatus({
				loading: false,
				success: false,
				error: "Bitte nehmen Sie sich einen Moment Zeit.",
			});
			return;
		}

		// Validierung
		if (
			!formData.name ||
			!formData.email ||
			!formData.subject ||
			!formData.message
		) {
			setStatus({
				loading: false,
				success: false,
				error: "Bitte füllen Sie alle Pflichtfelder aus.",
			});
			return;
		}

		// E-Mail Validierung
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			setStatus({
				loading: false,
				success: false,
				error: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
			});
			return;
		}

		setStatus({ loading: true, success: false, error: null });

		try {
			const response = await fetch(API_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: formData.name,
					email: formData.email,
					phone: formData.phone,
					subject: formData.subject,
					message: formData.message,
					website: formData.website, // Honeypot wird mitgesendet
				}),
			});

			const data = await response.json();

			if (response.ok && data.success) {
				setStatus({
					loading: false,
					success: true,
					error: null,
				});

				// Formular zurücksetzen
				setFormData({
					name: "",
					email: "",
					phone: "",
					subject: "",
					message: "",
					website: "",
				});

				// Erfolgs-Nachricht nach 5 Sekunden ausblenden
				setTimeout(() => {
					setStatus({ loading: false, success: false, error: null });
				}, 5000);
			} else {
				setStatus({
					loading: false,
					success: false,
					error:
						data.error ||
						"Fehler beim Senden. Bitte versuchen Sie es später erneut.",
				});
			}
		} catch (error) {
			console.error("Error:", error);
			setStatus({
				loading: false,
				success: false,
				error:
					"Verbindungsfehler. Bitte überprüfen Sie Ihre Internetverbindung.",
			});
		}
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

								{/* Honeypot-Feld (versteckt, Spam-Schutz) */}
								<div style={{ display: "none" }} aria-hidden="true">
									<label htmlFor="website">Website (bitte leer lassen)</label>
									<input
										type="text"
										id="website"
										name="website"
										value={formData.website}
										onChange={handleChange}
										tabIndex="-1"
										autoComplete="off"
									/>
								</div>

								{/* Status-Meldungen */}
								{status.success && (
									<div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center gap-3">
										<FaCheckCircle className="text-2xl" />
										<div>
											<p className="font-bold">Nachricht gesendet!</p>
											<p className="text-sm">
												Vielen Dank für Ihre Nachricht. Wir melden uns bald bei
												Ihnen.
											</p>
										</div>
									</div>
								)}

								{status.error && (
									<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center gap-3">
										<FaExclamationCircle className="text-2xl" />
										<div>
											<p className="font-bold">Fehler</p>
											<p className="text-sm">{status.error}</p>
										</div>
									</div>
								)}

								<div>
									<Button
										type="submit"
										variant="primary"
										size="lg"
										className="w-full"
										disabled={status.loading}
									>
										{status.loading ? (
											<span className="flex items-center justify-center gap-2">
												<svg
													className="animate-spin h-5 w-5"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
												>
													<circle
														className="opacity-25"
														cx="12"
														cy="12"
														r="10"
														stroke="currentColor"
														strokeWidth="4"
													></circle>
													<path
														className="opacity-75"
														fill="currentColor"
														d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
													></path>
												</svg>
												Wird gesendet...
											</span>
										) : (
											"Nachricht senden"
										)}
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
