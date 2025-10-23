import Section from "../components/Section";
import Card from "../components/Card";
import Button from "../components/Button";
import { FaSun, FaPalette, FaUsers, FaHeart } from "react-icons/fa";

// CMS NOTE: Ferientermine aus CMS laden

const Ferien = () => {
	// CMS NOTE: Diese Termine später aus CMS
	const ferienTermine = [
		{
			id: 1,
			title: "Osterferien 2025",
			dates: "7. - 11. April 2025",
			age: "6-14 Jahre",
			time: "9:00 - 16:00 Uhr",
			price: "120€",
			description:
				"Frühlingserwachen im Zirkus! Eine Woche voller bunter Zirkusabenteuer.",
			image:
				"https://images.unsplash.com/photo-1464047736614-af63643285bf?w=800&h=600&fit=crop",
			spotsLeft: 8,
		},
		{
			id: 2,
			title: "Pfingstferien 2025",
			dates: "9. - 13. Juni 2025",
			age: "6-14 Jahre",
			time: "9:00 - 16:00 Uhr",
			price: "120€",
			description:
				"Perfektes Wetter für Zirkusspaß draußen unter freiem Himmel!",
			image:
				"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",
			spotsLeft: 15,
		},
		{
			id: 3,
			title: "Sommerferien Woche 1",
			dates: "21. - 25. Juli 2025",
			age: "6-14 Jahre",
			time: "9:00 - 16:00 Uhr",
			price: "120€",
			description:
				"Die erste von zwei spektakulären Sommerwochen im Zirkuszelt!",
			image:
				"https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop",
			spotsLeft: 12,
		},
		{
			id: 4,
			title: "Sommerferien Woche 2",
			dates: "28. Juli - 1. August 2025",
			age: "6-14 Jahre",
			time: "9:00 - 16:00 Uhr",
			price: "120€",
			description:
				"Noch eine Woche Zirkuszauber für alle, die nicht genug bekommen!",
			image:
				"https://images.unsplash.com/photo-1464047736614-af63643285bf?w=800&h=600&fit=crop",
			spotsLeft: 15,
		},
		{
			id: 5,
			title: "Herbstferien 2025",
			dates: "20. - 24. Oktober 2025",
			age: "6-14 Jahre",
			time: "9:00 - 16:00 Uhr",
			price: "120€",
			description:
				"Herbstliche Zirkusmagie mit bunten Blättern und warmen Herzen.",
			image:
				"https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop",
			spotsLeft: 20,
		},
	];

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<Section backgroundColor="yellow" className="text-center py-20">
				<FaSun className="text-6xl text-circus-red mb-6 mx-auto" />
				<h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
					Ferien im Zirkus
				</h1>
				<p className="text-xl max-w-3xl mx-auto text-gray-800">
					Unvergessliche Ferienwochen voller Spaß, Bewegung und Zirkusmagie –
					mit einer großen Show zum Abschluss!
				</p>
			</Section>

			{/* Intro */}
			<Section title="Eine Woche voller Abenteuer" subtitle="Das erwartet dich">
				<div className="max-w-4xl mx-auto text-center mb-12">
					<p className="text-lg text-gray-700 mb-6 leading-relaxed">
						In unseren Zirkusferien tauchen Kinder für eine Woche in die
						faszinierende Welt des Zirkus ein. Unter professioneller Anleitung
						erlernen sie Akrobatik, Jonglage, Clownerie und vieles mehr.
					</p>
					<p className="text-lg text-gray-700 mb-8 leading-relaxed">
						Am Ende der Woche präsentieren alle Kinder gemeinsam eine große Show
						für Familie und Freunde – ein Erlebnis, das sie nie vergessen
						werden!
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					<div className="text-center p-6">
						<FaUsers className="text-5xl text-circus-red mx-auto mb-4" />
						<h3 className="text-xl font-bold mb-2">Teamwork</h3>
						<p className="text-gray-600">
							Gemeinsam stark – neue Freundschaften entstehen
						</p>
					</div>
					<div className="text-center p-6">
						<FaPalette className="text-5xl text-circus-blue mx-auto mb-4" />
						<h3 className="text-xl font-bold mb-2">Kreativität</h3>
						<p className="text-gray-600">
							Eigene Ideen einbringen und umsetzen
						</p>
					</div>
					<div className="text-center p-6">
						<FaHeart className="text-5xl text-circus-yellow mx-auto mb-4" />
						<h3 className="text-xl font-bold mb-2">Selbstvertrauen</h3>
						<p className="text-gray-600">
							Über sich hinauswachsen und stolz sein
						</p>
					</div>
					<div className="text-center p-6">
						<FaSun className="text-5xl text-circus-red mx-auto mb-4" />
						<h3 className="text-xl font-bold mb-2">Spaß</h3>
						<p className="text-gray-600">
							Bewegung, Lachen und unvergessliche Momente
						</p>
					</div>
				</div>
			</Section>

			{/* Ferientermine */}
			<Section
				title="Termine 2025"
				subtitle="Jetzt anmelden"
				backgroundColor="gray"
			>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{ferienTermine.map((termin) => (
						<Card key={termin.id} className="flex flex-col">
							<div className="relative h-56 overflow-hidden rounded-t-xl">
								<img
									src={termin.image}
									alt={termin.title}
									className="w-full h-full object-cover"
								/>
								{termin.spotsLeft && (
									<div className="absolute top-4 right-4 bg-circus-yellow text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
										Noch {termin.spotsLeft} Plätze frei
									</div>
								)}
							</div>

							<div className="p-6 flex-grow flex flex-col">
								<h3 className="text-2xl font-bold text-gray-900 mb-2">
									{termin.title}
								</h3>
								<p className="text-gray-600 mb-4">{termin.description}</p>

								<div className="space-y-2 mb-6 flex-grow">
									<div className="flex justify-between text-gray-700">
										<span className="font-semibold">Termine:</span>
										<span>{termin.dates}</span>
									</div>
									<div className="flex justify-between text-gray-700">
										<span className="font-semibold">Alter:</span>
										<span>{termin.age}</span>
									</div>
									<div className="flex justify-between text-gray-700">
										<span className="font-semibold">Zeit:</span>
										<span>{termin.time}</span>
									</div>
									<div className="flex justify-between text-gray-700">
										<span className="font-semibold">Preis:</span>
										<span className="text-circus-red font-bold text-lg">
											{termin.price}
										</span>
									</div>
								</div>

								<Button variant="primary" className="w-full">
									Jetzt anmelden
								</Button>
							</div>
						</Card>
					))}
				</div>
			</Section>

			{/* Tagesablauf */}
			<Section title="Ein typischer Tag" subtitle="So sieht's aus">
				<div className="max-w-3xl mx-auto">
					<div className="space-y-6">
						<div className="flex items-start bg-white p-6 rounded-lg shadow-md">
							<div className="font-bold text-circus-red text-2xl mr-4 flex-shrink-0">
								9:00
							</div>
							<div>
								<h3 className="font-bold text-lg mb-1">Ankommen & Warm-Up</h3>
								<p className="text-gray-600">
									Gemeinsames Ankommen, Spiele und Aufwärmen für den Tag
								</p>
							</div>
						</div>

						<div className="flex items-start bg-white p-6 rounded-lg shadow-md">
							<div className="font-bold text-circus-red text-2xl mr-4 flex-shrink-0">
								10:00
							</div>
							<div>
								<h3 className="font-bold text-lg mb-1">Workshop 1</h3>
								<p className="text-gray-600">
									Erste Trainingseinheit in Kleingruppen (Akrobatik, Jonglage,
									etc.)
								</p>
							</div>
						</div>

						<div className="flex items-start bg-white p-6 rounded-lg shadow-md">
							<div className="font-bold text-circus-red text-2xl mr-4 flex-shrink-0">
								11:30
							</div>
							<div>
								<h3 className="font-bold text-lg mb-1">Pause & Snack</h3>
								<p className="text-gray-600">
									Zeit zum Durchatmen, Trinken und Energie tanken
								</p>
							</div>
						</div>

						<div className="flex items-start bg-white p-6 rounded-lg shadow-md">
							<div className="font-bold text-circus-red text-2xl mr-4 flex-shrink-0">
								12:00
							</div>
							<div>
								<h3 className="font-bold text-lg mb-1">Mittagessen</h3>
								<p className="text-gray-600">
									Gemeinsames Mittagessen (bitte selbst mitbringen oder vor Ort
									bestellbar)
								</p>
							</div>
						</div>

						<div className="flex items-start bg-white p-6 rounded-lg shadow-md">
							<div className="font-bold text-circus-red text-2xl mr-4 flex-shrink-0">
								13:00
							</div>
							<div>
								<h3 className="font-bold text-lg mb-1">Workshop 2</h3>
								<p className="text-gray-600">
									Zweite Trainingseinheit, andere Disziplinen ausprobieren
								</p>
							</div>
						</div>

						<div className="flex items-start bg-white p-6 rounded-lg shadow-md">
							<div className="font-bold text-circus-red text-2xl mr-4 flex-shrink-0">
								14:30
							</div>
							<div>
								<h3 className="font-bold text-lg mb-1">Show-Probe</h3>
								<p className="text-gray-600">
									Gemeinsames Üben für die große Abschlussshow am Freitag
								</p>
							</div>
						</div>

						<div className="flex items-start bg-white p-6 rounded-lg shadow-md">
							<div className="font-bold text-circus-red text-2xl mr-4 flex-shrink-0">
								16:00
							</div>
							<div>
								<h3 className="font-bold text-lg mb-1">
									Abschlussrunde & Abholung
								</h3>
								<p className="text-gray-600">
									Reflexion des Tages und Verabschiedung
								</p>
							</div>
						</div>
					</div>

					<div className="mt-8 bg-circus-yellow p-6 rounded-lg text-center">
						<h3 className="font-bold text-xl mb-2">
							Die große Show am Freitag!
						</h3>
						<p className="text-gray-900">
							Am letzten Tag präsentieren alle Kinder ihre erlernten Kunststücke
							in einer großen Abschlussshow für Familie und Freunde. Ein
							unvergesslicher Moment!
						</p>
					</div>
				</div>
			</Section>

			{/* Was mitbringen */}
			<Section
				title="Was muss ich mitbringen?"
				subtitle="Packliste"
				backgroundColor="gray"
			>
				<div className="max-w-3xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-bold mb-4 text-circus-red">
								Kleidung & Co.
							</h3>
							<ul className="space-y-2 text-gray-700">
								<li>✓ Sportkleidung (bequem und bewegungsfreundlich)</li>
								<li>✓ Hallenschuhe oder rutschfeste Socken</li>
								<li>✓ Wechselkleidung (falls es schwitzig wird)</li>
								<li>✓ Sonnenschutz (im Sommer)</li>
							</ul>
						</div>

						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-bold mb-4 text-circus-red">
								Verpflegung
							</h3>
							<ul className="space-y-2 text-gray-700">
								<li>✓ Trinkflasche (immer wichtig!)</li>
								<li>✓ Snacks für die Pausen</li>
								<li>✓ Mittagessen oder Geld für Bestellung</li>
								<li>✓ Obst & gesunde Snacks empfohlen</li>
							</ul>
						</div>
					</div>

					<div className="mt-6 bg-white p-6 rounded-lg shadow-md">
						<h3 className="text-xl font-bold mb-4 text-circus-red">Wichtig!</h3>
						<ul className="space-y-2 text-gray-700">
							<li>
								✓ <strong>Keine Vorkenntnisse nötig</strong> – jede*r kann
								mitmachen!
							</li>
							<li>✓ Alle Zirkusmaterialien werden gestellt</li>
							<li>✓ Getränke (Wasser, Tee) stehen zur Verfügung</li>
							<li>
								✓ Bitte Schmuck und Uhren zu Hause lassen (Verletzungsgefahr)
							</li>
						</ul>
					</div>
				</div>
			</Section>

			{/* Anmeldung & Kontakt */}
			<Section backgroundColor="red" className="text-white text-center">
				<h2 className="text-4xl md:text-5xl font-bold mb-6">
					Bereit für dein Ferienabenteuer?
				</h2>
				<p className="text-xl mb-8 max-w-2xl mx-auto">
					Die Plätze sind begrenzt – melde dich jetzt an und sichere dir deinen
					Platz in den Harlekids Zirkusferien!
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Button variant="accent" size="lg" href="/kontakt">
						Jetzt anmelden
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

				<div className="mt-12 bg-white bg-opacity-20 rounded-lg p-6 max-w-2xl mx-auto">
					<h3 className="text-xl font-bold mb-3">Ermäßigungen möglich</h3>
					<p className="text-gray-100">
						Geschwisterkinder erhalten 10% Rabatt. Bei finanziellen
						Schwierigkeiten sprechen Sie uns bitte an – wir finden gemeinsam
						eine Lösung!
					</p>
				</div>
			</Section>
		</div>
	);
};

export default Ferien;
