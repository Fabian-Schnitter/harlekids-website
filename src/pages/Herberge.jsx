import Section from "../components/Section";
import Card from "../components/Card";
import Button from "../components/Button";
import {
	FaBed,
	FaUsers,
	FaUtensils,
	FaParking,
	FaShower,
} from "react-icons/fa";

// CMS NOTE: Herbergs-Informationen aus CMS (optional für später)

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
						<div className="rounded-lg shadow-lg w-full min-h-64 bg-circus-blue text-white flex items-center justify-center p-8 text-center">
							<FaBed className="text-6xl" aria-hidden="true" />
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
							<h3 className="text-2xl font-bold mb-3">Kleine Zimmer</h3>
							<p className="text-gray-700 mb-4">
								Für kleinere Gruppen stehen ruhige, einfach ausgestattete Zimmer
								zur Verfügung. Die konkrete Zimmeraufteilung stimmen wir gern mit
								euch ab.
							</p>
							<ul className="space-y-2 text-gray-700">
								<li>✓ Flexible Belegung nach Absprache</li>
								<li>✓ Heizung & Fenster</li>
								<li>✓ Stauraum für Gepäck</li>
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

			{/* Anfrage */}
			<Section
				title="Übernachtung auf Anfrage"
				subtitle="Wir planen euren Aufenthalt individuell"
				backgroundColor="gray"
			>
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
							Briesker Straße 134
							<br />
							01968 Senftenberg / OT Brieske
						</p>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
							<div>
								<h4 className="font-bold text-gray-900 mb-2">Mit dem Auto</h4>
								<p className="text-gray-700">
									Über die B96 sowie die A13-Anschlüsse Klettwitz und Schwarzheide
									ist die Herberge gut erreichbar.
								</p>
							</div>
							<div>
								<h4 className="font-bold text-gray-900 mb-2">
									Öffentliche Verkehrsmittel
								</h4>
								<p className="text-gray-700">
									Vom Bahnhof Senftenberg fährt die Citylinie zur Haltestelle
									„Hotel Marga“ direkt gegenüber dem Zirkuszentrum.
								</p>
							</div>
						</div>
					</div>

					<iframe
						title="Karte: Harlekids in Senftenberg-Brieske"
						src="https://www.openstreetmap.org/export/embed.html?bbox=13.962%2C51.497%2C13.973%2C51.507&amp;layer=mapnik&marker=51.502097%2C13.967400"
						className="w-full h-96 rounded-lg border-0"
						loading="lazy"
					/>
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
