import { useEffect, useState } from "react";
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
import { loadBlogPosts, loadOffers } from "../utils/contentLoader";
import jugendzirkusImage from "../assets/offers/jugendzirkus.png";
import zirkusferienImage from "../assets/offers/zirkusferien.png";
import zirkuspaedagogikImage from "../assets/offers/zirkuspaedagogik.png";

// CMS NOTE: Diese Daten sollten später aus dem CMS kommen
// Beispiel für Strapi: import { useEffect, useState } from 'react';
// const [heroData, setHeroData] = useState(null);
// useEffect(() => { fetch('http://localhost:1337/api/hero').then(res => res.json()).then(data => setHeroData(data)); }, []);

const Home = () => {
	const [latestPosts, setLatestPosts] = useState([]);
	const [offers, setOffers] = useState([]);
	const placeholderImages = {
		jugendzirkus: jugendzirkusImage,
		zirkusferien: zirkusferienImage,
		zirkuspaedagogik: zirkuspaedagogikImage,
		schulprojekte: zirkuspaedagogikImage,
		jugendherberge: zirkusferienImage,
		"events-shows": jugendzirkusImage,
	};

	useEffect(() => {
		loadBlogPosts().then((posts) => setLatestPosts(posts.slice(0, 3)));
		loadOffers().then(setOffers);
	}, []);

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			{/* CMS NOTE: Hero-Bild, Titel und Untertitel aus CMS laden */}
			<Hero
				title="Willkommen bei Harlekids"
				subtitle="Zirkuspädagogik, die bewegt – für Kinder, Jugendliche und alle, die den Zirkus lieben"
				backgroundImage="https://www.zpz-harlekids.de/wp-content/themes/harlekids2010/images/head_center.jpg"
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
					{offers.map((offer) => (
						<Card
							key={offer.slug}
							title={offer.title}
							image={offer.image || placeholderImages[offer.slug]}
							imageAlt={`Illustration zu ${offer.title}`}
						>
							<p className="text-gray-600 mb-4">{offer.description}</p>
							<Link to={offer.link || "/kontakt"}>
								<Button variant="primary" size="sm">
									{offer.buttonLabel || "Mehr erfahren"}
								</Button>
							</Link>
						</Card>
					))}
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
					{latestPosts.map((post) => (
						<Card key={post.slug} className="flex flex-col">
							<div className="text-sm text-circus-red font-semibold mb-2">
								{new Date(post.date).toLocaleDateString("de-DE", {
									day: "2-digit",
									month: "long",
									year: "numeric",
								})}
							</div>
							<h3 className="text-xl font-bold mb-3">{post.title}</h3>
							<p className="text-gray-600 mb-4 flex-grow">
								{post.excerpt || post.description || post.body}
							</p>
							<Link to="/blog">
								<Button variant="outline" size="sm">Weiterlesen</Button>
							</Link>
						</Card>
					))}
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
