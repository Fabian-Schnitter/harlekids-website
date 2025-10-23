import Hero from "../components/Hero";
import Section from "../components/Section";
import Card from "../components/Card";
import Button from "../components/Button";
import {
	FaTheaterMasks,
	FaChild,
	FaGraduationCap,
	FaHome,
	FaCalendar,
	FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// CMS NOTE: Diese Daten sollten später aus dem CMS kommen
// Beispiel für Strapi: import { useEffect, useState } from 'react';
// const [heroData, setHeroData] = useState(null);
// useEffect(() => { fetch('http://localhost:1337/api/hero').then(res => res.json()).then(data => setHeroData(data)); }, []);

const Home = () => {
	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			{/* CMS NOTE: Hero-Bild, Titel und Untertitel aus CMS laden */}
			<Hero
				title="Willkommen bei Harlekids"
				subtitle="Zirkuspädagogik, die bewegt – für Kinder, Jugendliche und alle, die den Zirkus lieben"
				backgroundImage="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920&h=1080&fit=crop"
				primaryCTA={{ text: "Jetzt anmelden", link: "/kontakt" }}
				secondaryCTA={{ text: "Mehr erfahren", link: "#angebote" }}
			/>

			{/* Über uns Section */}
			<Section title="Über Harlekids" subtitle="Wer wir sind">
				<div className="max-w-4xl mx-auto text-center">
					<p className="text-lg text-gray-700 mb-6 leading-relaxed">
						Seit vielen Jahren ist das{" "}
						<strong>Zirkuspädagogische Zentrum Harlekids</strong> ein Ort der
						Begegnung, Kreativität und persönlichen Entfaltung. Hier lernen
						Kinder und Jugendliche nicht nur Jonglieren, Akrobatik und Clownerie
						– sie entdecken ihre Stärken, überwinden Grenzen und wachsen über
						sich hinaus.
					</p>
					<p className="text-lg text-gray-700 mb-8 leading-relaxed">
						Unser Team aus erfahrenen Zirkuspädagog*innen begleitet jeden
						Schritt mit Leidenschaft und Fachwissen. Ob in wöchentlichen
						Trainings, Ferienworkshops oder Schulprojekten – bei uns steht der
						Mensch im Mittelpunkt.
					</p>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
						<div className="text-center">
							<div className="text-5xl font-bold text-circus-red mb-2">15+</div>
							<p className="text-gray-600">Jahre Erfahrung</p>
						</div>
						<div className="text-center">
							<div className="text-5xl font-bold text-circus-blue mb-2">
								500+
							</div>
							<p className="text-gray-600">Teilnehmer*innen pro Jahr</p>
						</div>
						<div className="text-center">
							<div className="text-5xl font-bold text-circus-yellow mb-2">
								20+
							</div>
							<p className="text-gray-600">Trainer*innen</p>
						</div>
					</div>
				</div>
			</Section>

			{/* Angebote Section */}
			{/* CMS NOTE: Angebote-Karten aus CMS laden */}
			<Section
				id="angebote"
				title="Unsere Angebote"
				subtitle="Was wir bieten"
				backgroundColor="gray"
			>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<Card
						image="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop"
						imageAlt="Kinder beim Jugendzirkus Training"
						title="Jugendzirkus"
					>
						<p className="text-gray-600 mb-4">
							Wöchentliche Trainings für alle Altersgruppen – von Anfänger*innen
							bis Fortgeschrittene. Gemeinsam erarbeiten wir Kunststücke und
							bringen sie in großen Shows auf die Bühne.
						</p>
						<Link to="/jugendzirkus">
							<Button variant="primary" size="sm">
								Mehr erfahren
							</Button>
						</Link>
					</Card>

					<Card
						image="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop"
						imageAlt="Kinder in Zirkusferien"
						title="Zirkusferien"
					>
						<p className="text-gray-600 mb-4">
							In den Ferien tauchen wir gemeinsam in die bunte Zirkuswelt ein.
							Eine Woche voller Spaß, Bewegung und kreativer Höhenflüge – mit
							einer großen Abschlussvorstellung!
						</p>
						<Link to="/ferien">
							<Button variant="primary" size="sm">
								Termine ansehen
							</Button>
						</Link>
					</Card>

					<Card
						image="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop"
						imageAlt="Zirkuspädagogik Ausbildung"
						title="Zirkuspädagogik"
					>
						<p className="text-gray-600 mb-4">
							Fortbildungen für Pädagog*innen, Lehrer*innen und alle, die
							zirkuspädagogische Methoden in ihre Arbeit integrieren möchten –
							professionell und praxisnah.
						</p>
						<Link to="/zirkuspaedagogik">
							<Button variant="primary" size="sm">
								Fortbildungen
							</Button>
						</Link>
					</Card>

					<Card
						image="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop"
						imageAlt="Schulprojekte"
						title="Schulprojekte"
					>
						<p className="text-gray-600 mb-4">
							Projekttage und Projektwochen an Schulen – maßgeschneidert und
							pädagogisch wertvoll. Wir kommen zu euch und bringen den Zirkus
							ins Klassenzimmer!
						</p>
						<Link to="/termine">
							<Button variant="primary" size="sm">
								Anfrage stellen
							</Button>
						</Link>
					</Card>

					<Card
						image="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop"
						imageAlt="Jugendherberge"
						title="Jugendherberge"
					>
						<p className="text-gray-600 mb-4">
							Übernachten mitten im Zirkus! Unsere gemütliche Herberge bietet
							Platz für Gruppen und ist der perfekte Ausgangspunkt für
							Zirkusabenteuer.
						</p>
						<Link to="/herberge">
							<Button variant="primary" size="sm">
								Verfügbarkeit prüfen
							</Button>
						</Link>
					</Card>

					<Card
						image="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop"
						imageAlt="Veranstaltungen"
						title="Events & Shows"
					>
						<p className="text-gray-600 mb-4">
							Von Sommerfesten bis zu Weihnachtsgalas – erlebe unsere
							spektakulären Shows und lass dich von der Magie des Zirkus
							verzaubern!
						</p>
						<Link to="/termine">
							<Button variant="primary" size="sm">
								Termine
							</Button>
						</Link>
					</Card>
				</div>
			</Section>

			{/* Warum Zirkus Section */}
			<Section title="Warum Zirkus?" subtitle="Die Kraft der Zirkuspädagogik">
				<div className="max-w-5xl mx-auto">
					<p className="text-lg text-gray-700 text-center mb-12 leading-relaxed">
						Zirkus ist mehr als Kunststücke und Applaus. Zirkus ist ein Raum für
						Wachstum, Mut und Gemeinschaft. Hier lernen Kinder und Jugendliche
						fürs Leben.
					</p>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						<div className="text-center p-6">
							<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-circus-red text-white mb-4">
								<FaStar size={28} />
							</div>
							<h3 className="text-xl font-bold mb-3">
								Selbstvertrauen stärken
							</h3>
							<p className="text-gray-600">
								Jeder Erfolg – ob kleiner Sprung oder großer Auftritt – stärkt
								das Selbstbewusstsein nachhaltig.
							</p>
						</div>

						<div className="text-center p-6">
							<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-circus-blue text-white mb-4">
								<FaChild size={28} />
							</div>
							<h3 className="text-xl font-bold mb-3">Teamgeist entwickeln</h3>
							<p className="text-gray-600">
								Gemeinsam Pyramiden bauen, sich gegenseitig sichern – Zirkus
								funktioniert nur im Team.
							</p>
						</div>

						<div className="text-center p-6">
							<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-circus-yellow text-gray-900 mb-4">
								<FaTheaterMasks size={28} />
							</div>
							<h3 className="text-xl font-bold mb-3">Kreativität entfalten</h3>
							<p className="text-gray-600">
								Vom Kostüm bis zur Choreografie – hier dürfen alle ihre Ideen
								einbringen und ausleben.
							</p>
						</div>

						<div className="text-center p-6">
							<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-circus-red text-white mb-4">
								<FaGraduationCap size={28} />
							</div>
							<h3 className="text-xl font-bold mb-3">
								Neue Fähigkeiten erlernen
							</h3>
							<p className="text-gray-600">
								Jonglieren, Akrobatik, Einradfahren – bei uns kann jede*r etwas
								Neues ausprobieren.
							</p>
						</div>

						<div className="text-center p-6">
							<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-circus-blue text-white mb-4">
								<FaHome size={28} />
							</div>
							<h3 className="text-xl font-bold mb-3">Zugehörigkeit erleben</h3>
							<p className="text-gray-600">
								Harlekids ist eine große Familie – hier findet jede*r einen
								Platz und wird so akzeptiert, wie sie/er ist.
							</p>
						</div>

						<div className="text-center p-6">
							<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-circus-yellow text-gray-900 mb-4">
								<FaCalendar size={28} />
							</div>
							<h3 className="text-xl font-bold mb-3">Routinen schaffen</h3>
							<p className="text-gray-600">
								Regelmäßige Trainings geben Struktur und sind ein Anker im
								Alltag vieler Kinder und Jugendlicher.
							</p>
						</div>
					</div>
				</div>
			</Section>

			{/* Aktuelles / Blog Teaser */}
			{/* CMS NOTE: Blog-Einträge aus CMS laden */}
			<Section
				title="Aktuelles"
				subtitle="News & Updates"
				backgroundColor="gray"
			>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
					<Card
						image="https://images.unsplash.com/photo-1464047736614-af63643285bf?w=800&h=500&fit=crop"
						imageAlt="Zirkusferien 2025"
					>
						<div className="text-sm text-circus-red font-semibold mb-2">
							23. Februar 2025
						</div>
						<h3 className="text-xl font-bold mb-3">Ferien im Zirkus 2025</h3>
						<p className="text-gray-600 mb-4">
							Die Termine für unsere Zirkusferien 2025 stehen fest! Jetzt
							schnell anmelden und einen Platz sichern.
						</p>
						<Button variant="outline" size="sm">
							Weiterlesen
						</Button>
					</Card>

					<Card
						image="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=500&fit=crop"
						imageAlt="Trainingstermine"
					>
						<div className="text-sm text-circus-red font-semibold mb-2">
							11. März 2023
						</div>
						<h3 className="text-xl font-bold mb-3">Neue Trainingstermine</h3>
						<p className="text-gray-600 mb-4">
							Unser Trainingsangebot wurde aktualisiert. Kommt vorbei und
							probiert euch aus!
						</p>
						<Button variant="outline" size="sm">
							Weiterlesen
						</Button>
					</Card>

					<Card
						image="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=500&fit=crop"
						imageAlt="Social Circus Fortbildung"
					>
						<div className="text-sm text-circus-red font-semibold mb-2">
							01. Juni 2022
						</div>
						<h3 className="text-xl font-bold mb-3">
							Social Circus Fortbildung
						</h3>
						<p className="text-gray-600 mb-4">
							Auch dieses Jahr findet wieder die Fortbildungsreihe Social Circus
							nach der Methode des Cirque du Soleil statt.
						</p>
						<Button variant="outline" size="sm">
							Weiterlesen
						</Button>
					</Card>
				</div>
				<div className="text-center">
					<Link to="/blog">
						<Button variant="primary" size="lg">
							Alle News ansehen
						</Button>
					</Link>
				</div>
			</Section>

			{/* Call to Action */}
			<Section backgroundColor="red" className="text-center">
				<h2 className="text-4xl md:text-5xl font-bold mb-6">
					Bereit für dein Zirkusabenteuer?
				</h2>
				<p className="text-xl mb-8 max-w-2xl mx-auto">
					Komm vorbei, schnupper rein und werde Teil der Harlekids-Familie. Wir
					freuen uns auf dich!
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Link to="/kontakt">
						<Button variant="accent" size="lg">
							Kontakt aufnehmen
						</Button>
					</Link>
					<Link to="/termine">
						<Button
							variant="outline"
							size="lg"
							className="border-white text-white hover:bg-white hover:text-circus-red"
						>
							Termine ansehen
						</Button>
					</Link>
				</div>
			</Section>
		</div>
	);
};

export default Home;
