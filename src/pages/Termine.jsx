import { useState, useEffect } from "react";
import Section from "../components/Section";
import Card from "../components/Card";
import Button from "../components/Button";
import {
	FaCalendarAlt,
	FaClock,
	FaMapMarkerAlt,
	FaUsers,
	FaEuroSign,
} from "react-icons/fa";
import { loadEvents, markdownToHtml } from "../utils/contentLoader";

const Termine = () => {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadEvents().then((data) => {
			setEvents(data);
			setLoading(false);
		});
	}, []);

	// Fallback zu Demo-Daten wenn keine Events im CMS
	const upcomingEvents =
		events.length > 0
			? events
			: [
					{
						id: 1,
						title: "Zirkusferien Osterferien",
						date: "7. - 11. April 2025",
						time: "9:00 - 16:00 Uhr",
						location: "Zirkushaus Harlekids",
						category: "Ferienangebot",
						description:
							"Eine Woche voller Zirkusabenteuer für Kinder von 6-14 Jahren. Mit großer Abschlussshow am Freitag!",
						image:
							"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",
						spotsLeft: 8,
					},
					{
						id: 2,
						title: "Jugendzirkus Training",
						date: "Jeden Dienstag",
						time: "16:30 - 18:00 Uhr",
						location: "Turnhalle Cottbus",
						category: "Regelmäßiges Training",
						description:
							"Wöchentliches Training für Jugendliche von 10-16 Jahren. Akrobatik, Jonglage und mehr!",
						image:
							"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
						spotsLeft: null,
					},
					{
						id: 3,
						title: "Social Circus Fortbildung",
						date: "15. - 17. Mai 2025",
						time: "Fr 17:00 - So 15:00 Uhr",
						location: "Zirkushaus Harlekids",
						category: "Fortbildung",
						description:
							"Fortbildungsreihe nach der Methode des Cirque du Soleil für Pädagog*innen und Trainer*innen.",
						image:
							"https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop",
						spotsLeft: 5,
					},
					{
						id: 4,
						title: "Sommergala 2025",
						date: "28. Juni 2025",
						time: "18:00 Uhr",
						location: "Zirkuszelt, Harlekids",
						category: "Show",
						description:
							"Große Sommergala mit allen Zirkusgruppen. Eintritt frei, Spenden willkommen!",
						image:
							"https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop",
						spotsLeft: null,
					},
					{
						id: 5,
						title: "Zirkusferien Sommerferien Woche 1",
						date: "21. - 25. Juli 2025",
						time: "9:00 - 16:00 Uhr",
						location: "Zirkushaus Harlekids",
						category: "Ferienangebot",
						description:
							"Erste Sommerferienwoche mit Zirkusspaß, Bewegung und Kreativität.",
						image:
							"https://images.unsplash.com/photo-1464047736614-af63643285bf?w=800&h=600&fit=crop",
						spotsLeft: 12,
					},
					{
						id: 6,
						title: "Zirkusferien Sommerferien Woche 2",
						date: "28. Juli - 1. August 2025",
						time: "9:00 - 16:00 Uhr",
						location: "Zirkushaus Harlekids",
						category: "Ferienangebot",
						description:
							"Zweite Sommerferienwoche - für alle, die nicht genug bekommen können!",
						image:
							"https://images.unsplash.com/photo-1464047736614-af63643285bf?w=800&h=600&fit=crop",
						spotsLeft: 15,
					},
			  ];

	const getCategoryColor = (category) => {
		switch (category) {
			case "Ferienangebot":
				return "bg-circus-yellow text-gray-900";
			case "Fortbildung":
				return "bg-circus-blue text-white";
			case "Show":
				return "bg-circus-red text-white";
			default:
				return "bg-gray-600 text-white";
		}
	};

	return (
		<div className="min-h-screen">
			{/* Header */}
			<Section backgroundColor="blue" className="text-white text-center py-20">
				<h1 className="text-5xl md:text-6xl font-bold mb-6">
					Termine & Veranstaltungen
				</h1>
				<p className="text-xl max-w-3xl mx-auto">
					Von regelmäßigen Trainings über Ferienangebote bis zu großen Shows –
					hier findest du alle aktuellen Termine und Events bei Harlekids.
				</p>
			</Section>

			{/* Termine Grid */}
			<Section title="Kommende Termine" subtitle="Was steht an?">
				{loading ? (
					<div className="text-center py-12">
						<p className="text-xl text-gray-600">Lade Termine...</p>
					</div>
				) : upcomingEvents.length === 0 ? (
					<div className="text-center py-12">
						<p className="text-xl text-gray-600">
							Derzeit sind keine Termine verfügbar.
						</p>
						<p className="text-gray-500 mt-4">
							Schaut bald wieder vorbei oder kontaktiert uns direkt!
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{upcomingEvents.map((event, index) => (
							<Card
								key={event.slug || event.id || index}
								className="flex flex-col"
							>
								{event.image && (
									<div className="relative h-56 overflow-hidden rounded-t-xl">
										<img
											src={event.image}
											alt={event.title}
											className="w-full h-full object-cover"
										/>
										<div className="absolute top-4 left-4">
											<span
												className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(
													event.category
												)}`}
											>
												{event.category}
											</span>
										</div>
										{event.spotsLeft && (
											<div className="absolute top-4 right-4 bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
												Noch {event.spotsLeft} Plätze frei
											</div>
										)}
									</div>
								)}

								<div className="p-6 flex-grow">
									<h3 className="text-2xl font-bold text-gray-900 mb-4">
										{event.title}
									</h3>

									<div
										className="text-gray-600 mb-6"
										dangerouslySetInnerHTML={{
											__html: event.body
												? markdownToHtml(event.body)
												: event.description,
										}}
									/>

									<div className="space-y-3 mb-6">
										<div className="flex items-center text-gray-700">
											<FaCalendarAlt className="text-circus-red mr-3 flex-shrink-0" />
											<span>
												{event.date
													? new Date(event.date).toLocaleDateString("de-DE", {
															day: "2-digit",
															month: "long",
															year: "numeric",
													  })
													: event.date}
											</span>
										</div>

										{(event.startTime || event.time) && (
											<div className="flex items-center text-gray-700">
												<FaClock className="text-circus-red mr-3 flex-shrink-0" />
												<span>
													{event.startTime}{" "}
													{event.endTime && `- ${event.endTime}`} Uhr
													{event.time && event.time}
												</span>
											</div>
										)}

										{event.location && (
											<div className="flex items-center text-gray-700">
												<FaMapMarkerAlt className="text-circus-red mr-3 flex-shrink-0" />
												<span>{event.location}</span>
											</div>
										)}

										{event.price && (
											<div className="flex items-center text-gray-700">
												<FaEuroSign className="text-circus-yellow mr-3 flex-shrink-0" />
												<span>{event.price}</span>
											</div>
										)}
									</div>

									{event.registrationRequired && event.registrationLink ? (
										<Button
											variant="primary"
											className="w-full"
											as="a"
											href={event.registrationLink}
											target="_blank"
											rel="noopener noreferrer"
										>
											Jetzt anmelden
										</Button>
									) : (
										<Button
											variant="primary"
											className="w-full"
											href="/kontakt"
										>
											Mehr Info
										</Button>
									)}
								</div>
							</Card>
						))}
					</div>
				)}
			</Section>

			{/* Schulprojekte Section */}
			<Section
				title="Zirkus macht Schule"
				subtitle="Projekttage & Projektwochen"
				backgroundColor="gray"
			>
				<div className="max-w-4xl mx-auto">
					<p className="text-lg text-gray-700 text-center mb-8 leading-relaxed">
						Wir bringen den Zirkus zu euch! Mit maßgeschneiderten Projekttagen
						und Projektwochen für Schulen, Kitas und Jugendeinrichtungen
						schaffen wir unvergessliche Erlebnisse.
					</p>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-bold mb-3 text-circus-red">
								Projekttage
							</h3>
							<ul className="space-y-2 text-gray-700">
								<li>• 1-3 Tage bei euch vor Ort</li>
								<li>• Für alle Altersgruppen</li>
								<li>• Individuelle Schwerpunkte möglich</li>
								<li>• Kleine Abschlusspräsentation</li>
							</ul>
						</div>

						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-bold mb-3 text-circus-red">
								Projektwochen
							</h3>
							<ul className="space-y-2 text-gray-700">
								<li>• 1 Woche intensives Training</li>
								<li>• Große Abschlussshow</li>
								<li>• Professionelle Begleitung</li>
								<li>• Material inklusive</li>
							</ul>
						</div>
					</div>

					<div className="text-center">
						<p className="text-gray-700 mb-6">
							Interessiert? Kontaktiert uns für ein individuelles Angebot!
						</p>
						<Button variant="primary" size="lg" href="/kontakt">
							Anfrage stellen
						</Button>
					</div>
				</div>
			</Section>

			{/* Newsletter Section */}
			{/* CMS NOTE: Newsletter-Anmeldung kann über das CMS verwaltet werden */}
			<Section backgroundColor="red" className="text-white text-center">
				<FaUsers className="text-6xl mb-6 mx-auto" />
				<h2 className="text-4xl font-bold mb-4">Bleib auf dem Laufenden!</h2>
				<p className="text-xl mb-8 max-w-2xl mx-auto">
					Melde dich für unseren Newsletter an und verpasse keine Termine,
					Events und Neuigkeiten mehr.
				</p>
				<form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
					<input
						type="email"
						placeholder="Deine E-Mail Adresse"
						className="flex-grow px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-circus-yellow"
						required
					/>
					<Button variant="accent" size="md">
						Anmelden
					</Button>
				</form>
				<p className="text-sm mt-4 text-gray-200">
					Keine Sorge, wir versenden nur relevante Infos und geben deine Daten
					nicht weiter.
				</p>
			</Section>
		</div>
	);
};

export default Termine;
