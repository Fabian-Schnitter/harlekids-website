import Section from "../components/Section";
import Card from "../components/Card";
import Button from "../components/Button";
import {
	FaGraduationCap,
	FaCertificate,
	FaUsers,
	FaBookOpen,
} from "react-icons/fa";

// CMS NOTE: Fortbildungsinhalte aus CMS

const Zirkuspaedagogik = () => {
	const fortbildungen = [
		{
			id: 1,
			title: "Social Circus Grundausbildung",
			duration: "4 Wochenenden",
			level: "Einsteiger & Fortgeschrittene",
			description:
				"Fortbildungsreihe nach der Methode des Cirque du Soleil. Professionell, praxisnah und zertifiziert.",
			image:
				"https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop",
			highlights: [
				"Zirkuspädagogische Grundlagen",
				"Social Circus Methodik",
				"Praktische Übungen & Spiele",
				"Zertifikat nach Abschluss",
			],
		},
		{
			id: 2,
			title: "Juleica-Schulung",
			duration: "4 Wochenenden",
			level: "Ab 16 Jahren",
			description:
				"Jugendleiter*in-Card Schulung speziell für angehende Zirkustrainer*innen und Betreuer*innen.",
			image:
				"https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=600&fit=crop",
			highlights: [
				"Pädagogische Grundlagen",
				"Aufsichtspflicht & Jugendschutz",
				"Gruppendynamik",
				"Erste Hilfe Kurs inklusive",
			],
		},
		{
			id: 3,
			title: "Akrobatik für Pädagog*innen",
			duration: "2 Tage",
			level: "Alle Level",
			description:
				"Praktische Akrobatik-Einheiten für den Einsatz in Schule, Kita und Jugendarbeit.",
			image:
				"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
			highlights: [
				"Sicherheit & Spotting",
				"Pyramiden & Partnerakrobatik",
				"Aufwärmspiele",
				"Direkt umsetzbare Übungen",
			],
		},
		{
			id: 4,
			title: "Jonglage & Objektmanipulation",
			duration: "1 Tag",
			level: "Anfänger",
			description:
				"Jonglieren lernen und lehren – von den Basics bis zu kreativen Vermittlungsmethoden.",
			image:
				"https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop",
			highlights: [
				"3-Ball-Jonglage",
				"Diabolo, Poi, Flowersticks",
				"Didaktische Vermittlung",
				"Spiele & Übungen",
			],
		},
	];

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
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{fortbildungen.map((fortbildung) => (
						<Card key={fortbildung.id} className="flex flex-col">
							<div className="relative h-56 overflow-hidden rounded-t-xl">
								<img
									src={fortbildung.image}
									alt={fortbildung.title}
									className="w-full h-full object-cover"
								/>
								<div className="absolute top-4 left-4 bg-circus-yellow text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
									{fortbildung.level}
								</div>
							</div>

							<div className="p-6 flex-grow flex flex-col">
								<h3 className="text-2xl font-bold text-gray-900 mb-2">
									{fortbildung.title}
								</h3>
								<div className="text-sm text-circus-red font-semibold mb-4">
									Dauer: {fortbildung.duration}
								</div>
								<p className="text-gray-600 mb-6">{fortbildung.description}</p>

								<div className="mb-6">
									<h4 className="font-semibold text-gray-900 mb-3">Inhalte:</h4>
									<ul className="space-y-2">
										{fortbildung.highlights.map((highlight, index) => (
											<li key={index} className="text-gray-700">
												✓ {highlight}
											</li>
										))}
									</ul>
								</div>

								<div className="mt-auto">
									<Button variant="primary" className="w-full">
										Mehr Infos & Anmeldung
									</Button>
								</div>
							</div>
						</Card>
					))}
				</div>
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
