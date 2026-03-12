import { useState, useEffect } from "react";
import Section from "../components/Section";
import Card from "../components/Card";
import Button from "../components/Button";
import { FaChild, FaUsers, FaStar, FaTheaterMasks } from "react-icons/fa";
import { loadJugendzirkus } from "../utils/contentLoader";

const Jugendzirkus = () => {
	const [trainingGroups, setTrainingGroups] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadJugendzirkus().then((data) => {
			setTrainingGroups(data);
			setLoading(false);
		});
	}, []);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p className="text-xl">Lade Jugendzirkus-Gruppen...</p>
			</div>
		);
	}

	const disciplines = [
		{
			name: "Akrobatik",
			icon: "🤸",
			description:
				"Pyramiden, Rad, Handstand und vieles mehr – Körperbeherrschung auf höchstem Niveau.",
		},
		{
			name: "Jonglage",
			icon: "🤹",
			description:
				"Bälle, Keulen, Ringe oder Diabolo – wir bringen alles in die Luft!",
		},
		{
			name: "Luftakrobatik",
			icon: "🎪",
			description:
				"Trapez, Vertikaltuch und Luftring – schwerelos durch die Lüfte schweben.",
		},
		{
			name: "Einrad",
			icon: "🚴",
			description:
				"Balance und Geschicklichkeit auf einem Rad – eine echte Herausforderung!",
		},
		{
			name: "Clownerie",
			icon: "🤡",
			description:
				"Spaß, Improvisation und Theater – hier wird gelacht und experimentiert.",
		},
		{
			name: "Tanz & Choreografie",
			icon: "💃",
			description: "Bewegung zur Musik, Ausdruckskraft und Performance.",
		},
	];

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<Section backgroundColor="blue" className="text-white text-center py-20">
				<FaTheaterMasks className="text-6xl mb-6 mx-auto" />
				<h1 className="text-5xl md:text-6xl font-bold mb-6">
					Kinder- & Jugendzirkus
				</h1>
				<p className="text-xl max-w-3xl mx-auto">
					Wöchentliche Trainings für alle Altersgruppen – vom ersten Schritt bis
					zur großen Show. Bei uns findet jede*r ihren Platz im Zirkus!
				</p>
			</Section>

			{/* Intro Section */}
			<Section title="Gemeinsam wachsen im Zirkus" subtitle="Was uns ausmacht">
				<div className="max-w-4xl mx-auto text-center">
					<p className="text-lg text-gray-700 mb-6 leading-relaxed">
						Unser Kinder- und Jugendzirkus ist mehr als Training – es ist eine
						Gemeinschaft, in der jede*r willkommen ist und Mut, Kreativität und
						Teamgeist gefördert werden.
					</p>
					<p className="text-lg text-gray-700 mb-8 leading-relaxed">
						Egal ob du noch nie einen Ball gefangen hast oder schon Rad schlagen
						kannst – bei uns darfst du sein, wie du bist, und dich in deinem
						Tempo entwickeln.
					</p>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
						<div className="p-6">
							<FaChild className="text-5xl text-circus-red mx-auto mb-4" />
							<h3 className="text-xl font-bold mb-2">Für alle offen</h3>
							<p className="text-gray-600">
								Keine Vorkenntnisse nötig – jede*r kann mitmachen!
							</p>
						</div>
						<div className="p-6">
							<FaUsers className="text-5xl text-circus-blue mx-auto mb-4" />
							<h3 className="text-xl font-bold mb-2">Starke Gemeinschaft</h3>
							<p className="text-gray-600">
								Freundschaften, die ein Leben lang halten.
							</p>
						</div>
						<div className="p-6">
							<FaStar className="text-5xl text-circus-yellow mx-auto mb-4" />
							<h3 className="text-xl font-bold mb-2">Große Auftritte</h3>
							<p className="text-gray-600">
								Mehrmals im Jahr präsentieren wir unsere Shows.
							</p>
						</div>
					</div>
				</div>
			</Section>

			{/* Trainingsgruppen */}
			<Section
				title="Unsere Trainingsgruppen"
				subtitle="Finde deine Gruppe"
				backgroundColor="gray"
			>
				{trainingGroups.length === 0 ? (
					<p className="text-center text-gray-500">
						Derzeit sind keine Trainingsgruppen verfügbar.
					</p>
				) : (
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{trainingGroups.map((group, index) => (
							<Card key={index} hoverable={false} className="h-full">
								{group.image && (
									<img
										src={group.image}
										alt={group.title}
										className="w-full h-48 object-cover rounded-t-lg mb-4"
									/>
								)}

								<div className="flex justify-between items-start mb-4">
									<h3 className="text-2xl font-bold text-gray-900">
										{group.title}
									</h3>
									<span className="bg-circus-yellow text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
										{group.ageGroup}
									</span>
								</div>

								<p className="text-gray-700 mb-6">{group.description}</p>

								<div className="space-y-2 mb-6">
									<div className="flex justify-between text-gray-700">
										<span className="font-semibold">Wann:</span>
										<span>
											{group.weekday}, {group.time}
										</span>
									</div>
									{group.level && (
										<div className="flex justify-between text-gray-700">
											<span className="font-semibold">Level:</span>
											<span>{group.level}</span>
										</div>
									)}
									{group.price && (
										<div className="flex justify-between text-gray-700">
											<span className="font-semibold">Preis:</span>
											<span>{group.price}</span>
										</div>
									)}
									{group.availableSpots !== undefined &&
										group.availableSpots !== null && (
											<div className="flex justify-between text-gray-700">
												<span className="font-semibold">Freie Plätze:</span>
												<span className="text-circus-green font-bold">
													{group.availableSpots}
												</span>
											</div>
										)}
								</div>

								{group.registrationLink ? (
									<Button
										as="a"
										href={group.registrationLink}
										variant="primary"
										className="w-full"
									>
										Jetzt anmelden
									</Button>
								) : (
									<Button variant="primary" className="w-full" href="/kontakt">
										Schnuppertraining vereinbaren
									</Button>
								)}
							</Card>
						))}
					</div>
				)}

				<div className="mt-12 text-center bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
					<h3 className="text-2xl font-bold mb-4 text-circus-red">
						Schnuppertraining
					</h3>
					<p className="text-gray-700 mb-6">
						Du bist dir nicht sicher, welche Gruppe die richtige ist? Kein
						Problem! Komm einfach zum kostenlosen Schnuppertraining vorbei und
						finde es heraus.
					</p>
					<Button variant="primary" size="lg" href="/kontakt">
						Schnuppertermin anfragen
					</Button>
				</div>
			</Section>

			{/* Disziplinen */}
			<Section title="Was du lernen kannst" subtitle="Unsere Disziplinen">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{disciplines.map((discipline, index) => (
						<div
							key={index}
							className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
						>
							<div className="text-6xl mb-4">{discipline.icon}</div>
							<h3 className="text-xl font-bold mb-3 text-gray-900">
								{discipline.name}
							</h3>
							<p className="text-gray-600">{discipline.description}</p>
						</div>
					))}
				</div>

				<div className="mt-12 text-center">
					<p className="text-lg text-gray-700 mb-6">
						Und das Beste: Du kannst dich in allen Bereichen ausprobieren und
						deine Favoriten entdecken!
					</p>
				</div>
			</Section>

			{/* Kosten & Anmeldung */}
			<Section
				title="Kosten & Anmeldung"
				subtitle="So wirst du Teil der Harlekids"
				backgroundColor="gray"
			>
				<div className="max-w-4xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
						<div className="bg-white p-8 rounded-lg shadow-md">
							<h3 className="text-2xl font-bold mb-4 text-circus-red">
								Mitgliedschaft
							</h3>
							<div className="text-4xl font-bold text-gray-900 mb-2">30€</div>
							<div className="text-gray-600 mb-6">pro Monat</div>
							<ul className="space-y-3 text-gray-700 mb-6">
								<li>✓ Teilnahme an allen Trainings deiner Gruppe</li>
								<li>✓ Professionelle Betreuung</li>
								<li>✓ Nutzung aller Geräte & Materialien</li>
								<li>✓ Teilnahme an Shows & Auftritten</li>
								<li>✓ Ermäßigung bei Ferienangeboten</li>
							</ul>
							<p className="text-sm text-gray-600">
								* Ermäßigungen für Geschwisterkinder und soziale Härtefälle
								möglich
							</p>
						</div>

						<div className="bg-white p-8 rounded-lg shadow-md">
							<h3 className="text-2xl font-bold mb-4 text-circus-red">
								So geht's
							</h3>
							<ol className="space-y-4 text-gray-700">
								<li className="flex">
									<span className="font-bold text-circus-red mr-3">1.</span>
									<span>Schnuppertraining (kostenlos) vereinbaren</span>
								</li>
								<li className="flex">
									<span className="font-bold text-circus-red mr-3">2.</span>
									<span>Vorbeikommen und reinschnuppern</span>
								</li>
								<li className="flex">
									<span className="font-bold text-circus-red mr-3">3.</span>
									<span>Anmeldeformular ausfüllen</span>
								</li>
								<li className="flex">
									<span className="font-bold text-circus-red mr-3">4.</span>
									<span>Loslegen und Teil der Familie werden!</span>
								</li>
							</ol>
							<div className="mt-8">
								<Button variant="primary" className="w-full" href="/kontakt">
									Jetzt anmelden
								</Button>
							</div>
						</div>
					</div>

					<div className="bg-circus-yellow p-8 rounded-lg text-center">
						<h3 className="text-2xl font-bold mb-4">Fragen?</h3>
						<p className="text-gray-900 mb-6">
							Wir beantworten gerne alle deine Fragen rund um den Jugendzirkus.
							Ruf uns an oder schreib uns eine E-Mail!
						</p>
						<Button variant="primary" href="/kontakt">
							Kontakt aufnehmen
						</Button>
					</div>
				</div>
			</Section>
		</div>
	);
};

export default Jugendzirkus;
