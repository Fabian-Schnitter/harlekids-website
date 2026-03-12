import { useState, useEffect } from "react";
import Section from "../components/Section";
import Card from "../components/Card";
import Button from "../components/Button";
import {
	FaGraduationCap,
	FaCertificate,
	FaUsers,
	FaBookOpen,
} from "react-icons/fa";
import { loadFortbildungen } from "../utils/contentLoader";

const Zirkuspaedagogik = () => {
	const [fortbildungen, setFortbildungen] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadFortbildungen().then((data) => {
			setFortbildungen(data);
			setLoading(false);
		});
	}, []);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p className="text-xl">Lade Fortbildungen...</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen">
			{/* Hero */}
			<Section backgroundColor="blue" className="text-white text-center py-20">
				<FaGraduationCap className="text-6xl mb-6 mx-auto" />
				<h1 className="text-5xl md:text-6xl font-bold mb-6">Zirkuspädagogik</h1>
				<p className="text-xl max-w-3xl mx-auto">
					Professionelle Aus- und Fortbildungen für Pädagog*innen, Lehrer*innen
					und alle, die mit Kindern und Jugendlichen arbeiten.
				</p>
			</Section>

			{/* Intro */}
			<Section
				title="Zirkus als pädagogisches Werkzeug"
				subtitle="Warum Fortbildung?"
			>
				<div className="max-w-4xl mx-auto text-center">
					<p className="text-lg text-gray-700 mb-6 leading-relaxed">
						Zirkus ist weit mehr als Unterhaltung – er ist ein kraftvolles
						pädagogisches Werkzeug. In unseren Fortbildungen lernen Sie, wie Sie
						zirkuspädagogische Methoden in Ihrer täglichen Arbeit mit Kindern
						und Jugendlichen einsetzen können.
					</p>
					<p className="text-lg text-gray-700 mb-8 leading-relaxed">
						Ob in Schule, Kita, Jugendarbeit oder Therapie – Zirkuspädagogik
						fördert Selbstvertrauen, Teamgeist, Kreativität und soziale
						Kompetenzen auf spielerische und nachhaltige Weise.
					</p>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
						<div className="p-6">
							<FaCertificate className="text-5xl text-circus-red mx-auto mb-4" />
							<h3 className="text-xl font-bold mb-2">Zertifiziert</h3>
							<p className="text-gray-600">
								Anerkannte Abschlüsse und Zertifikate
							</p>
						</div>
						<div className="p-6">
							<FaUsers className="text-5xl text-circus-blue mx-auto mb-4" />
							<h3 className="text-xl font-bold mb-2">Praxisnah</h3>
							<p className="text-gray-600">
								Viel Praxis, direkt umsetzbare Inhalte
							</p>
						</div>
						<div className="p-6">
							<FaBookOpen className="text-5xl text-circus-yellow mx-auto mb-4" />
							<h3 className="text-xl font-bold mb-2">Erfahren</h3>
							<p className="text-gray-600">
								Von erfahrenen Zirkuspädagog*innen
							</p>
						</div>
					</div>
				</div>
			</Section>

			{/* Fortbildungen */}
			<Section
				title="Unsere Fortbildungen"
				subtitle="Angebote 2025"
				backgroundColor="gray"
			>
				{fortbildungen.length === 0 ? (
					<p className="text-center text-gray-500">
						Derzeit sind keine Fortbildungen verfügbar.
					</p>
				) : (
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{fortbildungen.map((fortbildung, index) => (
							<Card key={index} className="flex flex-col">
								{fortbildung.image && (
									<div className="relative h-56 overflow-hidden rounded-t-xl">
										<img
											src={fortbildung.image}
											alt={fortbildung.title}
											className="w-full h-full object-cover"
										/>
									</div>
								)}

								<div className="p-6 flex flex-col flex-grow">
									<h3 className="text-2xl font-bold mb-2">
										{fortbildung.title}
									</h3>

									<div className="flex gap-4 mb-4 text-sm text-gray-600">
										<span className="flex items-center gap-1">
											<FaGraduationCap className="text-circus-blue" />
											{fortbildung.level}
										</span>
										<span>• {fortbildung.duration}</span>
									</div>

									<p className="text-gray-700 mb-4">
										{fortbildung.description}
									</p>

									{fortbildung.highlights &&
										fortbildung.highlights.length > 0 && (
											<div className="mb-4">
												<h4 className="font-bold mb-2">Inhalte:</h4>
												<ul className="space-y-1">
													{fortbildung.highlights.map((highlight, i) => (
														<li key={i} className="text-gray-600 text-sm">
															✓ {highlight}
														</li>
													))}
												</ul>
											</div>
										)}

									{fortbildung.price && (
										<p className="text-lg font-bold text-circus-red mb-4">
											{fortbildung.price}
										</p>
									)}

									{fortbildung.startDate && (
										<p className="text-sm text-gray-600 mb-4">
											Start:{" "}
											{new Date(fortbildung.startDate).toLocaleDateString(
												"de-DE",
											)}
										</p>
									)}

									{fortbildung.registrationLink && (
										<Button
											as="a"
											href={fortbildung.registrationLink}
											variant="primary"
											className="mt-auto"
										>
											Jetzt anmelden
										</Button>
									)}
								</div>
							</Card>
						))}
					</div>
				)}
			</Section>

			{/* Was Sie lernen */}
			<Section title="Was Sie bei uns lernen" subtitle="Kompetenzen">
				<div className="max-w-5xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-bold mb-3 text-circus-red">
								Praktische Fähigkeiten
							</h3>
							<ul className="space-y-2 text-gray-700">
								<li>• Zirkustechniken selbst erlernen und anleiten</li>
								<li>• Sichere Übungsgestaltung & Spotting</li>
								<li>• Materialkunde & Gerätehandhabung</li>
								<li>• Aufbau von Trainingseinheiten</li>
							</ul>
						</div>

						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-bold mb-3 text-circus-red">
								Pädagogisches Know-how
							</h3>
							<ul className="space-y-2 text-gray-700">
								<li>• Gruppendynamik & Teambuilding</li>
								<li>• Inklusive Arbeit mit heterogenen Gruppen</li>
								<li>• Umgang mit Konflikten</li>
								<li>• Motivation & Empowerment</li>
							</ul>
						</div>

						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-bold mb-3 text-circus-red">
								Social Circus Methodik
							</h3>
							<ul className="space-y-2 text-gray-700">
								<li>• Soziales Lernen durch Zirkus</li>
								<li>• Partizipation & Selbstwirksamkeit</li>
								<li>• Arbeit mit benachteiligten Zielgruppen</li>
								<li>• Internationale Best Practices</li>
							</ul>
						</div>

						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-bold mb-3 text-circus-red">
								Organisatorisches
							</h3>
							<ul className="space-y-2 text-gray-700">
								<li>• Projektplanung & -durchführung</li>
								<li>• Sicherheit & Aufsichtspflicht</li>
								<li>• Finanzierung & Förderung</li>
								<li>• Öffentlichkeitsarbeit</li>
							</ul>
						</div>
					</div>
				</div>
			</Section>

			{/* Zielgruppen */}
			<Section
				title="Für wen sind unsere Fortbildungen?"
				subtitle="Zielgruppen"
				backgroundColor="gray"
			>
				<div className="max-w-4xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{[
							"Lehrer*innen aller Schulformen",
							"Erzieher*innen in Kitas",
							"Sozialpädagog*innen",
							"Jugendarbeiter*innen",
							"Freizeitpädagog*innen",
							"Therapeut*innen",
							"Studierende pädagogischer Fachrichtungen",
							"Aktive Zirkuskünstler*innen",
							"Alle Interessierten",
						].map((group, index) => (
							<div
								key={index}
								className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow"
							>
								<div className="text-3xl mb-3">✓</div>
								<p className="text-gray-700 font-semibold">{group}</p>
							</div>
						))}
					</div>

					<div className="mt-12 bg-circus-yellow p-8 rounded-lg text-center">
						<h3 className="text-2xl font-bold mb-3">
							Keine Vorkenntnisse nötig!
						</h3>
						<p className="text-gray-900">
							Sie müssen kein*e Artist*in sein, um Zirkuspädagogik zu machen.
							Wichtig sind Freude an der Arbeit mit Menschen und Offenheit für
							Neues!
						</p>
					</div>
				</div>
			</Section>

			{/* Referenzen */}
			<Section title="Stimmen von Teilnehmer*innen" subtitle="Das sagen andere">
				<div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="bg-white p-6 rounded-lg shadow-md">
						<div className="text-circus-yellow text-2xl mb-3">★★★★★</div>
						<p className="text-gray-700 mb-4 italic">
							"Die Social Circus Fortbildung hat meine Arbeit mit Jugendlichen
							komplett verändert. Endlich habe ich Werkzeuge, um alle zu
							erreichen!"
						</p>
						<p className="text-sm text-gray-600">
							– Sarah M., Sozialarbeiterin
						</p>
					</div>

					<div className="bg-white p-6 rounded-lg shadow-md">
						<div className="text-circus-yellow text-2xl mb-3">★★★★★</div>
						<p className="text-gray-700 mb-4 italic">
							"Praxisnah, kompetent und mit viel Herz. Die Juleica-Schulung bei
							Harlekids war genau das Richtige für mich."
						</p>
						<p className="text-sm text-gray-600">
							– Jonas T., angehender Trainer
						</p>
					</div>

					<div className="bg-white p-6 rounded-lg shadow-md">
						<div className="text-circus-yellow text-2xl mb-3">★★★★★</div>
						<p className="text-gray-700 mb-4 italic">
							"Als Lehrerin habe ich hier so viele neue Ideen bekommen. Die
							Akrobatik-Fortbildung war super strukturiert und macht Lust auf
							mehr!"
						</p>
						<p className="text-sm text-gray-600">
							– Katrin W., Grundschullehrerin
						</p>
					</div>
				</div>
			</Section>

			{/* CTA */}
			<Section backgroundColor="red" className="text-white text-center">
				<h2 className="text-4xl md:text-5xl font-bold mb-6">
					Bereit für Ihre Weiterbildung?
				</h2>
				<p className="text-xl mb-8 max-w-2xl mx-auto">
					Investieren Sie in Ihre Kompetenzen und erweitern Sie Ihr
					pädagogisches Repertoire mit Zirkuspädagogik. Wir freuen uns auf Sie!
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Button variant="accent" size="lg" href="/kontakt">
						Anmelden
					</Button>
					<Button
						variant="outline"
						size="lg"
						className="border-white text-white hover:bg-white hover:text-circus-red"
						href="/termine"
					>
						Termine ansehen
					</Button>
				</div>

				<div className="mt-12 bg-white bg-opacity-20 rounded-lg p-6 max-w-2xl mx-auto">
					<h3 className="text-xl font-bold mb-3">Inhouse-Schulungen</h3>
					<p className="text-gray-100">
						Wir kommen auch zu Ihnen! Gerne konzipieren wir individuelle
						Fortbildungen für Ihr Team, Ihre Schule oder Ihre Einrichtung.
					</p>
				</div>
			</Section>
		</div>
	);
};

export default Zirkuspaedagogik;
