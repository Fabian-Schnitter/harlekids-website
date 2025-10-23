import Section from "../components/Section";
import Card from "../components/Card";
import Button from "../components/Button";
import {
	FaBed,
	FaUsers,
	FaUtensils,
	FaWifi,
	FaParking,
	FaShower,
} from "react-icons/fa";

// CMS NOTE: Herbergs-Informationen aus CMS

const Herberge = () => {
	const ausstattung = [
		{
			icon: <FaBed />,
			title: "Übernachtung",
			description:
				"Platz für bis zu 30 Personen in gemütlichen Mehrbettzimmern",
		},
		{
			icon: <FaShower />,
			title: "Sanitäranlagen",
			description: "Moderne Duschen und WCs",
		},
		{
			icon: <FaUtensils />,
			title: "Selbstversorger-Küche",
			description: "Voll ausgestattete Küche für gemeinsames Kochen",
		},
		{
			icon: <FaUsers />,
			title: "Gemeinschaftsräume",
			description: "Große Aufenthaltsräume für Gruppenaktivitäten",
		},
		{
			icon: <FaWifi />,
			title: "WLAN",
			description: "Kostenloser Internetzugang",
		},
		{
			icon: <FaParking />,
			title: "Parkplätze",
			description: "Ausreichend Parkplätze direkt vor Ort",
		},
	];

	return (
		<div className="min-h-screen">
			{/* Hero */}
			<Section backgroundColor="blue" className="text-white text-center py-20">
				<FaBed className="text-6xl mb-6 mx-auto" />
				<h1 className="text-5xl md:text-6xl font-bold mb-6">
					Die Jugendherberge im Zirkus
				</h1>
				<p className="text-xl max-w-3xl mx-auto">
					Übernachten Sie mitten im Zirkus! Unsere gemütliche Herberge ist der
					perfekte Ausgangspunkt für Gruppenreisen, Klassenfahrten und
					Zirkusabenteuer.
				</p>
			</Section>

			{/* Intro */}
			<Section
				title="Willkommen in unserer Herberge"
				subtitle="Übernachten bei Harlekids"
			>
				<div className="max-w-4xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
						<div>
							<img
								src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop"
								alt="Jugendherberge Außenansicht"
								className="rounded-lg shadow-lg w-full"
							/>
						</div>
						<div>
							<p className="text-lg text-gray-700 mb-4 leading-relaxed">
								Unsere Jugendherberge liegt direkt neben dem Zirkushaus und
								bietet Gruppen einen einzigartigen Ort zum Übernachten. Ob
								Schulklasse, Sportverein oder Jugendgruppe – hier könnt ihr
								gemeinsam Zeit verbringen und gleichzeitig die faszinierende
								Welt des Zirkus kennenlernen.
							</p>
							<p className="text-lg text-gray-700 leading-relaxed">
								Die Herberge ist einfach und gemütlich ausgestattet – perfekt
								für Gruppen, die authentische Erlebnisse und echtes
								Gemeinschaftsgefühl suchen.
							</p>
						</div>
					</div>
				</div>
			</Section>

			{/* Ausstattung */}
			<Section
				title="Ausstattung & Annehmlichkeiten"
				subtitle="Was wir bieten"
				backgroundColor="gray"
			>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{ausstattung.map((item, index) => (
						<Card key={index} hoverable={false} className="text-center">
							<div className="text-5xl text-circus-red mb-4 flex justify-center">
								{item.icon}
							</div>
							<h3 className="text-xl font-bold mb-3">{item.title}</h3>
							<p className="text-gray-600">{item.description}</p>
						</Card>
					))}
				</div>
			</Section>

			{/* Zimmer & Kapazität */}
			<Section title="Zimmer & Räumlichkeiten" subtitle="Platz für eure Gruppe">
				<div className="max-w-5xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
						<Card className="h-full">
							<img
								src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=500&fit=crop"
								alt="Mehrbettzimmer"
								className="w-full h-48 object-cover rounded-lg mb-4"
							/>
							<h3 className="text-2xl font-bold mb-3">Mehrbettzimmer</h3>
							<p className="text-gray-700 mb-4">
								Unsere Zimmer bieten Platz für 4-8 Personen. Schlicht, sauber
								und gemütlich – ideal für Jugendgruppen.
							</p>
							<ul className="space-y-2 text-gray-700">
								<li>✓ Stockbetten</li>
								<li>✓ Schränke für Gepäck</li>
								<li>✓ Heizung</li>
								<li>✓ Fenster</li>
							</ul>
						</Card>

						<Card className="h-full">
							<img
								src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop"
								alt="Gemeinschaftsraum"
								className="w-full h-48 object-cover rounded-lg mb-4"
							/>
							<h3 className="text-2xl font-bold mb-3">Gemeinschaftsräume</h3>
							<p className="text-gray-700 mb-4">
								Große Aufenthaltsräume für gemeinsame Aktivitäten, Workshops
								oder einfach zum Zusammensein.
							</p>
							<ul className="space-y-2 text-gray-700">
								<li>✓ Sitzgelegenheiten</li>
								<li>✓ Tische für Gruppenarbeit</li>
								<li>✓ Beamer & Technik</li>
								<li>✓ Direkte Verbindung zum Zirkushaus</li>
							</ul>
						</Card>
					</div>

					<div className="bg-circus-yellow p-8 rounded-lg text-center">
						<h3 className="text-2xl font-bold mb-3">Kapazität</h3>
						<div className="text-5xl font-bold text-circus-red mb-4">30</div>
						<p className="text-gray-900 text-lg">
							Übernachtungsplätze für Ihre Gruppe
						</p>
					</div>
				</div>
			</Section>

			{/* Angebote & Pakete */}
			<Section
				title="Angebote & Pakete"
				subtitle="Kombinationen mit Zirkus"
				backgroundColor="gray"
			>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<Card>
						<h3 className="text-2xl font-bold mb-4 text-circus-red">
							Übernachtung pur
						</h3>
						<div className="text-3xl font-bold text-gray-900 mb-2">15€</div>
						<div className="text-gray-600 mb-6">pro Person/Nacht</div>
						<ul className="space-y-2 text-gray-700 mb-6">
							<li>✓ Übernachtung im Mehrbettzimmer</li>
							<li>✓ Nutzung aller Gemeinschaftsräume</li>
							<li>✓ Sanitäranlagen</li>
							<li>✓ Selbstversorger-Küche</li>
						</ul>
						<Button variant="primary" className="w-full">
							Anfragen
						</Button>
					</Card>

					<Card className="border-2 border-circus-red">
						<div className="bg-circus-red text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
							BELIEBT
						</div>
						<h3 className="text-2xl font-bold mb-4 text-circus-red">
							Zirkus-Paket
						</h3>
						<div className="text-3xl font-bold text-gray-900 mb-2">35€</div>
						<div className="text-gray-600 mb-6">pro Person/Tag</div>
						<ul className="space-y-2 text-gray-700 mb-6">
							<li>✓ Übernachtung</li>
							<li>✓ Zirkus-Workshop (3 Std.)</li>
							<li>✓ Zirkusmaterialien inklusive</li>
							<li>✓ Betreuung durch Trainer*innen</li>
							<li>✓ Kleine Abschlusspräsentation</li>
						</ul>
						<Button variant="primary" className="w-full">
							Anfragen
						</Button>
					</Card>

					<Card>
						<h3 className="text-2xl font-bold mb-4 text-circus-red">
							Projektwoche
						</h3>
						<div className="text-3xl font-bold text-gray-900 mb-2">ab 180€</div>
						<div className="text-gray-600 mb-6">pro Person/5 Tage</div>
						<ul className="space-y-2 text-gray-700 mb-6">
							<li>✓ 4 Übernachtungen</li>
							<li>✓ Tägliche Zirkustrainings</li>
							<li>✓ Vollverpflegung optional</li>
							<li>✓ Große Abschlussshow</li>
							<li>✓ Individuelle Programmgestaltung</li>
						</ul>
						<Button variant="primary" className="w-full">
							Anfragen
						</Button>
					</Card>
				</div>

				<div className="mt-12 text-center bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
					<h3 className="text-2xl font-bold mb-4">Individuelle Angebote</h3>
					<p className="text-gray-700 mb-6">
						Wir stellen gerne ein maßgeschneidertes Programm für Ihre Gruppe
						zusammen. Sprechen Sie uns an – wir finden gemeinsam die perfekte
						Lösung!
					</p>
					<Button variant="primary" size="lg" href="/kontakt">
						Individuelle Anfrage stellen
					</Button>
				</div>
			</Section>

			{/* Hausordnung & Hinweise */}
			<Section title="Wichtige Hinweise" subtitle="Was Sie wissen sollten">
				<div className="max-w-4xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-bold mb-4 text-circus-red">
								Hausordnung
							</h3>
							<ul className="space-y-2 text-gray-700">
								<li>• Nachtruhe ab 22:00 Uhr</li>
								<li>• Rauchfrei im gesamten Gebäude</li>
								<li>• Alkohol nur für Erwachsene nach Absprache</li>
								<li>• Respektvoller Umgang miteinander</li>
								<li>• Sauberkeit wird gemeinsam gewährleistet</li>
							</ul>
						</div>

						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-bold mb-4 text-circus-red">
								Mitbringen
							</h3>
							<ul className="space-y-2 text-gray-700">
								<li>• Schlafsack & Kopfkissen (oder Bettwäsche)</li>
								<li>• Handtücher</li>
								<li>• Hausschuhe</li>
								<li>• Kulturbeutel</li>
								<li>• Bei Selbstversorgung: eigene Lebensmittel</li>
							</ul>
						</div>
					</div>

					<div className="mt-8 bg-circus-yellow p-6 rounded-lg">
						<h3 className="text-xl font-bold mb-3">Betreuung & Aufsicht</h3>
						<p className="text-gray-900">
							Für Gruppen mit Minderjährigen ist eine Begleitperson
							erforderlich. Die Aufsichtspflicht liegt bei den begleitenden
							Erwachsenen. Unsere Mitarbeiter*innen stehen für Fragen und
							Notfälle zur Verfügung.
						</p>
					</div>
				</div>
			</Section>

			{/* Lage & Anfahrt */}
			<Section
				title="Lage & Anfahrt"
				subtitle="Wie Sie uns finden"
				backgroundColor="gray"
			>
				<div className="max-w-4xl mx-auto">
					<div className="bg-white p-8 rounded-lg shadow-md mb-8">
						<h3 className="text-2xl font-bold mb-4 text-circus-red">Adresse</h3>
						<p className="text-gray-700 text-lg mb-4">
							Zirkuspädagogisches Zentrum Harlekids
							<br />
							[Straße & Hausnummer]
							<br />
							[PLZ] [Ort]
						</p>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
							<div>
								<h4 className="font-bold text-gray-900 mb-2">Mit dem Auto</h4>
								<p className="text-gray-700">
									Ausreichend Parkplätze direkt vor Ort vorhanden. Anfahrt über
									[Hauptstraße].
								</p>
							</div>
							<div>
								<h4 className="font-bold text-gray-900 mb-2">
									Öffentliche Verkehrsmittel
								</h4>
								<p className="text-gray-700">
									Bus-Haltestelle "[Haltestellenname]" in 5 Min. Fußweg. Bahnhof
									[Ort] ca. 10 km entfernt.
								</p>
							</div>
						</div>
					</div>

					{/* CMS NOTE: Google Maps Embed hier einfügen */}
					<div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
						<p className="text-gray-600">[Hier Google Maps Karte einbinden]</p>
					</div>
				</div>
			</Section>

			{/* CTA */}
			<Section backgroundColor="red" className="text-white text-center">
				<h2 className="text-4xl md:text-5xl font-bold mb-6">
					Bereit für eure Gruppenreise?
				</h2>
				<p className="text-xl mb-8 max-w-2xl mx-auto">
					Bucht jetzt eure Übernachtung in unserer Zirkusherberge und erlebt
					gemeinsam unvergessliche Tage im Zeichen des Zirkus!
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Button variant="accent" size="lg" href="/kontakt">
						Verfügbarkeit anfragen
					</Button>
					<Button
						variant="outline"
						size="lg"
						className="border-white text-white hover:bg-white hover:text-circus-red"
						href="/kontakt"
					>
						Fragen? Kontakt
					</Button>
				</div>
			</Section>
		</div>
	);
};

export default Herberge;
