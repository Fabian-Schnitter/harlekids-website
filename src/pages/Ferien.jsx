import { useState, useEffect } from "react";
import Section from "../components/Section";
import Card from "../components/Card";
import Button from "../components/Button";
import MomentsGallery from "../components/MomentsGallery";
import {
	FaSun,
	FaPalette,
	FaUsers,
	FaHeart,
	FaCalendar,
	FaClock,
	FaEuroSign,
	FaMapMarkerAlt,
	FaEnvelope,
	FaPhone,
} from "react-icons/fa";
import { loadFerienprogramme, markdownToHtml } from "../utils/contentLoader";

const programmeImages = [
	"/images/momente/feriengruppe-unter-baeumen.jpg",
	"/images/momente/lagerfeuer.jpg",
	"/images/momente/zirkuszelt-tag.jpg",
	"/images/momente/ferienausflug.jpg",
];

const Ferien = () => {
	const [programme, setProgramme] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadFerienprogramme().then((data) => {
			setProgramme(data);
			setLoading(false);
		});
	}, []);

	const ferienTermine = programme;
	const ferienJahre = [...new Set(ferienTermine.map((termin) => termin.year).filter(Boolean))]
		.sort((a, b) => a - b)
		.join(" / ");
	const registrationContact = ferienTermine.find((termin) => termin.contactEmail);
	const registrationEmail = registrationContact?.contactEmail || "herberge@zpz-harlekids.de";
	const registrationLink = registrationContact?.registrationLink || `mailto:${registrationEmail}`;

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<Section backgroundColor="yellow" className="text-center py-14 md:py-16">
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

			<MomentsGallery
				eyebrow="Ferienmomente"
				title="Eine Woche, viele gemeinsame Erlebnisse"
				items={[
					{
						src: "/images/momente/feriengruppe-unter-baeumen.jpg",
						alt: "Feriengruppe unterwegs auf einem Weg unter großen Bäumen",
						caption: "Gemeinsam unterwegs",
					},
					{
						src: "/images/momente/lagerfeuer.jpg",
						alt: "Marshmallows werden gemeinsam über einer Feuerschale geröstet",
						caption: "Abende am Lagerfeuer",
					},
					{
						src: "/images/momente/zirkuskino.jpg",
						alt: "Kinder schauen im abgedunkelten Zirkuszelt gemeinsam einen Film",
						caption: "Zeit zum Entspannen",
					},
				]}
			/>

			{/* Ferientermine */}
			<Section
				title={`Termine${ferienJahre ? ` ${ferienJahre}` : ""}`}
				subtitle="Jetzt anmelden"
				backgroundColor="gray"
			>
				{loading ? (
					<div className="text-center py-12">
						<p className="text-xl text-gray-600">Lade Ferienprogramme...</p>
					</div>
				) : ferienTermine.length === 0 ? (
					<div className="text-center py-12">
						<p className="text-xl text-gray-600">
							Derzeit sind keine Ferienprogramme verfügbar.
						</p>
						<p className="text-gray-500 mt-4">
							Schaut bald wieder vorbei oder kontaktiert uns direkt!
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{ferienTermine.map((termin, index) => (
							<Card
								key={termin.slug || termin.id || index}
								className="flex flex-col"
							>
								{(termin.image || programmeImages[index % programmeImages.length]) && (
									<div className="relative h-56 overflow-hidden rounded-t-xl">
										<img
											src={termin.image || programmeImages[index % programmeImages.length]}
											alt={termin.title}
											loading="lazy"
											decoding="async"
											className="w-full h-full object-cover"
										/>
										{termin.maxParticipants && termin.spotsLeft && (
											<div className="absolute top-4 right-4 bg-circus-yellow text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
												Noch {termin.spotsLeft} Plätze frei
											</div>
										)}
									</div>
								)}

								<div className="p-6 flex-grow flex flex-col">
									<h3 className="text-2xl font-bold text-gray-900 mb-2">
										{termin.title}
									</h3>

									<div
										className="text-gray-600 mb-4"
										dangerouslySetInnerHTML={{
											__html: markdownToHtml(
												termin.body || termin.description,
											),
										}}
									/>

									<div className="space-y-2 mb-6 flex-grow">
										{(termin.startDate || termin.dates) && (
											<div className="flex justify-between text-gray-700">
												<span className="font-semibold flex items-center">
													<FaCalendar className="mr-2 text-circus-red" />
													Termine:
												</span>
												<span>
													{termin.startDate && termin.endDate
														? `${new Date(termin.startDate).toLocaleDateString(
																"de-DE"
														  )} - ${new Date(
																termin.endDate
														  ).toLocaleDateString("de-DE")}`
														: termin.dates}
												</span>
											</div>
										)}
										{(termin.ageGroup || termin.age) && (
											<div className="flex justify-between text-gray-700">
												<span className="font-semibold flex items-center">
													<FaUsers className="mr-2 text-circus-blue" />
													Alter:
												</span>
												<span>{termin.ageGroup || termin.age}</span>
											</div>
										)}
										{termin.time && (
											<div className="flex flex-col gap-1 text-gray-700 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
												<span className="flex shrink-0 items-center font-semibold">
													<FaClock className="mr-2 text-circus-blue" />
													Zeit:
												</span>
												<span className="pl-6 leading-relaxed sm:pl-0 sm:text-right">
													{termin.time}
												</span>
											</div>
										)}
										{termin.priceWithStay || termin.priceWithoutStay ? (
											<div className="space-y-2 border-t border-gray-200 pt-4 text-gray-700">
												<p className="flex items-center font-semibold">
													<FaEuroSign className="mr-2 text-circus-yellow" />
													Preise
												</p>
												{termin.priceWithStay && (
													<div className="grid grid-cols-[1fr_auto] items-center gap-3">
														<span className="whitespace-nowrap">Mit Übernachtung</span>
														<span className="whitespace-nowrap text-lg font-bold text-circus-red">
															{termin.priceWithStay}
														</span>
													</div>
												)}
												{termin.priceWithoutStay && (
													<div className="grid grid-cols-[1fr_auto] items-center gap-3">
														<span className="whitespace-nowrap">Ohne Übernachtung</span>
														<span className="whitespace-nowrap text-lg font-bold text-circus-red">
															{termin.priceWithoutStay}
														</span>
													</div>
												)}
											</div>
										) : termin.price ? (
											<div className="flex items-center justify-between gap-3 text-gray-700">
												<span className="flex items-center font-semibold">
													<FaEuroSign className="mr-2 text-circus-yellow" />
													Preis:
												</span>
												<span className="text-right text-lg font-bold text-circus-red">
													{termin.price}
												</span>
											</div>
										) : null}
									</div>

									{termin.registrationLink ? (
										<Button
											variant="primary"
											className="w-full"
											href={termin.registrationLink}
										>
											Jetzt anmelden
										</Button>
									) : (
										<Button
											variant="primary"
											className="w-full"
											href={`mailto:${registrationEmail}`}
										>
											Jetzt anmelden
										</Button>
									)}
								</div>
							</Card>
						))}
					</div>
				)}

				{registrationContact && (
					<div className="mx-auto mt-10 max-w-3xl bg-white p-6 shadow-md md:p-8">
						<h3 className="mb-4 text-2xl font-bold text-circus-red">Anmeldung</h3>
						<p className="mb-5 text-gray-700">
							Die Anmeldung für die Zirkusferien läuft direkt über {registrationContact.contactName}.
						</p>
						<div className="grid gap-3 text-gray-700 sm:grid-cols-2">
							<a className="flex items-center font-semibold text-circus-blue hover:underline" href={`mailto:${registrationContact.contactEmail}`}>
								<FaEnvelope className="mr-2" />{registrationContact.contactEmail}
							</a>
							<a className="flex items-center font-semibold text-circus-blue hover:underline" href={`tel:${registrationContact.contactPhone.replace(/[^+\d]/g, "")}`}>
								<FaPhone className="mr-2" />{registrationContact.contactPhone}
							</a>
							{registrationContact.contactFax && <p>Fax: {registrationContact.contactFax}</p>}
							<p>Harlekids e.V., Briesker Straße 134, 01968 Brieske</p>
						</div>
					</div>
				)}
			</Section>

			{/* Tagesablauf */}
			<Section title="Ein typischer Tag" subtitle="So sieht's aus">
				<div className="max-w-3xl mx-auto">
					<div className="space-y-6">
						{[
							["08:30", "Frühstück", "Gemeinsam in den Tag starten."],
							["09:00", "Treffen", "Ankommen und gemeinsamer Tagesbeginn."],
							["10:00", "Training", "Training in den jeweiligen Zirkusdisziplinen."],
							["12:00", "Pause", "Zeit zum Durchatmen und Erholen."],
							["12:30", "Essen", "Gemeinsames Mittagessen."],
							["bis 14:00", "Pause", "Mittagspause bis zum nächsten Workshop."],
							["14:00", "Workshop", "Kreative Zeit und Vertiefung der Zirkuskünste."],
							["15:45", "Vesper", "Gemeinsame Vesperpause."],
							["16:00", "Abholen der Tageskinder", "Danach beginnt das Nachmittagsprogramm."],
							["18:00", "Essen", "Gemeinsames Abendessen."],
							["22:00", "Nachtruhe", "Zeit zum Ausruhen und Schlafen."],
						].map(([time, title, description]) => (
							<div key={`${time}-${title}`} className="flex items-start bg-white p-6 rounded-lg shadow-md">
								<div className="font-bold text-circus-red text-2xl mr-4 flex-shrink-0">{time}</div>
								<div>
									<h3 className="font-bold text-lg mb-1">{title}</h3>
									<p className="text-gray-600">{description}</p>
								</div>
							</div>
						))}
					</div>

					<div className="mt-8 bg-circus-yellow p-6 rounded-lg text-center">
						<h3 className="font-bold text-xl mb-2">
							Die große Abschlussshow!
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
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
								<li>✓ Vollverpflegung während der Ferienwoche</li>
								<li>✓ Frühstück, Mittagessen und Abendessen</li>
								<li>✓ Bei Bedarf gibt es zusätzlich Vesper</li>
								<li>✓ Wasser und Tee stehen zur Verfügung</li>
								<li>✓ Allergien bitte bei der Anmeldung angeben</li>
							</ul>
						</div>

						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-xl font-bold mb-4 text-circus-red">
								Sonstige Dinge
							</h3>
							<ul className="space-y-2 text-gray-700">
								<li>✓ Beschriftete Trinkflasche</li>
								<li>✓ Eigene Zirkussachen dürfen gern mitgebracht werden</li>
								<li>✓ Kleiner Rucksack für persönliche Dinge</li>
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
							<li>
								✓ Schmuck und Uhren bitte zu Hause lassen (Verletzungsgefahr)
							</li>
							<li>✓ Keine Wertsachen mitbringen</li>
							<li>✓ Handys bitte zu Hause lassen</li>
						</ul>
					</div>
				</div>
			</Section>

			{/* Lage & Anfahrt */}
			<Section
				title="Lage & Anfahrt"
				subtitle="So findet ihr zu uns"
				backgroundColor="gray"
			>
				<div className="max-w-4xl mx-auto">
					<div className="bg-white p-8 rounded-lg shadow-md mb-8">
						<div className="flex items-start gap-4">
							<FaMapMarkerAlt className="text-3xl text-circus-red mt-1 flex-shrink-0" />
							<div>
								<h3 className="text-2xl font-bold mb-3 text-circus-red">Adresse</h3>
								<p className="text-gray-700 text-lg">
									Zirkuspädagogisches Zentrum Harlekids
									<br />
									Briesker Straße 134
									<br />
									01968 Senftenberg / OT Brieske
								</p>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
							<div>
								<h4 className="font-bold text-gray-900 mb-2">Mit dem Auto</h4>
								<p className="text-gray-700">
									Über die B196 sowie die A13-Anschlüsse Klettwitz und Schwarzheide
									ist das Zirkuszentrum gut erreichbar.
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
					<Button variant="accent" size="lg" href={registrationLink}>
						Jetzt anmelden
					</Button>
					<Button
						variant="inverse"
						size="lg"
						href={`mailto:${registrationEmail}`}
					>
						Fragen zur Anmeldung
					</Button>
				</div>
			</Section>
		</div>
	);
};

export default Ferien;
