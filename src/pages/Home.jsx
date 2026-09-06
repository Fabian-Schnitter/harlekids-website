import { createElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
	FaArrowRight,
	FaCalendarAlt,
	FaChild,
	FaGraduationCap,
	FaHome,
	FaStar,
	FaTheaterMasks,
} from "react-icons/fa";
import Hero from "../components/Hero";
import Section from "../components/Section";
import Card from "../components/Card";
import Button from "../components/Button";
import { loadBlogPosts, loadOffers } from "../utils/contentLoader";

const quickLinks = [
	{
		title: "Kurse",
		text: "Regelmäßig trainieren und Neues ausprobieren",
		to: "/jugendzirkus",
		icon: FaChild,
	},
	{
		title: "Zirkusferien",
		text: "Eine Ferienwoche voller Manege und Gemeinschaft",
		to: "/ferien",
		icon: FaStar,
	},
	{
		title: "Termine",
		text: "Shows, Veranstaltungen und aktuelle Angebote",
		to: "/termine",
		icon: FaCalendarAlt,
	},
	{
		title: "Herberge",
		text: "Mit Gruppen direkt bei den Harlekids übernachten",
		to: "/herberge",
		icon: FaHome,
	},
];

const offerPresentation = {
	jugendzirkus: { icon: FaChild, color: "#ae0533" },
	zirkusferien: { icon: FaStar, color: "#064f69" },
	schulprojekte: { icon: FaGraduationCap, color: "#f4a261" },
	jugendherberge: { icon: FaHome, color: "#064f69" },
	"events-shows": { icon: FaTheaterMasks, color: "#ae0533" },
};

const formatDate = (date) =>
	new Date(date).toLocaleDateString("de-DE", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});

const Home = () => {
	const [latestPosts, setLatestPosts] = useState([]);
	const [offers, setOffers] = useState([]);

	useEffect(() => {
		loadBlogPosts().then((posts) => setLatestPosts(posts.slice(0, 3)));
		loadOffers().then(setOffers);
	}, []);

	const [featuredPost, ...otherPosts] = latestPosts;

	return (
		<div className="min-h-screen overflow-hidden">
			<Hero
				eyebrow="Kinder- und Jugendzirkus in Senftenberg"
				title="Willkommen bei Harlekids"
				subtitle="Zirkus, der bewegt – mit Mut, Kreativität und ganz viel Gemeinschaft."
				backgroundImage="https://www.zpz-harlekids.de/wp-content/themes/harlekids2010/images/head_center.jpg"
				primaryCTA={{ text: "Mitmachen", link: "/jugendzirkus" }}
				secondaryCTA={{ text: "Ferien entdecken", link: "/ferien" }}
			/>

			<nav className="home-quicklinks" aria-label="Direkt zu unseren Angeboten">
				<div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
					{quickLinks.map(({ title, text, to, icon }) => (
						<Link key={title} to={to} className="home-quicklink group">
							{createElement(icon, {
								className: "home-quicklink-icon",
								"aria-hidden": true,
							})}
							<span>
								<strong>{title}</strong>
								<small>{text}</small>
							</span>
							<FaArrowRight className="home-quicklink-arrow" aria-hidden="true" />
						</Link>
					))}
				</div>
			</nav>

			{featuredPost && (
				<section className="home-news py-14 md:py-20">
					<div className="container mx-auto px-4">
						<div className="home-section-heading">
							<div>
								<p className="home-kicker">Aktuelles</p>
								<h2>Neues aus der Manege</h2>
							</div>
							<Button to="/blog" variant="outline" size="sm">
								Alle Beiträge
							</Button>
						</div>

						<div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
							<article className="home-featured-post">
								<p>{formatDate(featuredPost.date)}</p>
								<h3>{featuredPost.title}</h3>
								<div>{featuredPost.excerpt || featuredPost.description || featuredPost.body}</div>
								<Button to="/blog" variant="accent" size="sm">
									Beitrag lesen
								</Button>
							</article>

							<div className="grid gap-6">
								{otherPosts.map((post) => (
									<article key={post.slug} className="home-news-card">
										<p>{formatDate(post.date)}</p>
										<h3>{post.title}</h3>
										<Link to="/blog">
											Weiterlesen <FaArrowRight aria-hidden="true" />
										</Link>
									</article>
								))}
							</div>
						</div>
					</div>
				</section>
			)}

			<section className="home-about pt-14 pb-0 md:pt-20 md:pb-0">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl">
						<p className="home-kicker">Das sind wir</p>
						<h2 className="mb-7 text-4xl font-black tracking-tight text-gray-900 md:text-6xl">
							Ein Ort, an dem Kinder über sich hinauswachsen
						</h2>
						<p className="mb-5 text-lg leading-relaxed text-gray-700">
							Beim Harlekids e.V. lernen Kinder und Jugendliche Jonglage, Akrobatik,
							Clownerie und vieles mehr. Dabei geht es um Mut, Vertrauen und das
							gemeinsame Erlebnis in der Manege.
						</p>
						<p className="mb-8 text-lg leading-relaxed text-gray-700">
							Unser Team begleitet wöchentliche Kurse, Ferienwochen, Schulprojekte
							und Aufführungen mit Erfahrung und Begeisterung.
						</p>
						<Button to="/jugendzirkus" variant="primary" size="lg">
							Unsere Kurse entdecken
						</Button>
					</div>

					<div className="home-stats-panel mt-14 md:mt-16">
						<p className="home-stats-label">Harlekids in Zahlen</p>
						<dl>
							{[
								["15+", "Jahre Erfahrung"],
								["500+", "Teilnehmer*innen pro Jahr"],
								["20+", "Trainer*innen"],
							].map(([value, label]) => (
								<div key={label}>
									<dd>{value}</dd>
									<dt>{label}</dt>
								</div>
							))}
						</dl>
					</div>
				</div>
			</section>

			<Section
				id="angebote"
				title="Unsere Angebote"
				subtitle="Manege frei"
				backgroundColor="gray"
				className="home-offers-section"
			>
				<p className="mx-auto mb-12 max-w-2xl text-center text-lg leading-relaxed text-gray-600">
					Ob jede Woche, in den Ferien oder als gemeinsames Schulprojekt – hier
					findet ihr den passenden Einstieg in die Zirkuswelt.
				</p>
				<div className="flex flex-wrap justify-center gap-7">
					{offers.map((offer) => {
						const presentation = offerPresentation[offer.slug] || {
							icon: FaStar,
							color: "#064f69",
						};

						return (
							<Card
								key={offer.slug}
								title={offer.title}
								image={offer.image}
								imageAlt={`Illustration zu ${offer.title}`}
								icon={presentation.icon}
								accentColor={presentation.color}
								className="circus-offer-card w-full md:w-[calc(50%_-_0.875rem)] lg:w-[calc(33.333%_-_1.167rem)]"
							>
								<p className="mb-6 leading-relaxed text-gray-600">{offer.description}</p>
								<Button to={offer.link || "/kontakt"} variant="primary" size="sm">
									{offer.buttonLabel || "Mehr erfahren"}
								</Button>
							</Card>
						);
					})}
				</div>
			</Section>

			<section className="home-values py-14 md:py-20">
				<div className="container mx-auto px-4">
					<div className="mx-auto mb-14 max-w-3xl text-center">
						<p className="home-kicker">Warum Zirkus?</p>
						<h2 className="mb-5 text-4xl font-black tracking-tight text-gray-900 md:text-5xl">
							Gemeinsam lernen. Gemeinsam staunen.
						</h2>
						<p className="text-lg leading-relaxed text-gray-600">
							Zirkus verbindet Bewegung und Kreativität mit einem starken Gefühl
							von Gemeinschaft.
						</p>
					</div>
					<div className="grid gap-6 md:grid-cols-3">
						{[
							[FaStar, "Mut", "Neue Kunststücke ausprobieren, dranbleiben und den eigenen Erfolg erleben."],
							[FaChild, "Miteinander", "Sich gegenseitig sichern, vertrauen und als Gruppe etwas auf die Beine stellen."],
							[FaTheaterMasks, "Kreativität", "Eigene Ideen entwickeln und sie gemeinsam auf die Bühne bringen."],
						].map(([icon, title, text], index) => (
							<article key={title} className="home-value-card">
								<span>0{index + 1}</span>
								{createElement(icon, { "aria-hidden": true })}
								<h3>{title}</h3>
								<p>{text}</p>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="home-finale py-14 text-white md:py-20">
				<div className="container mx-auto px-4 text-center">
					<p className="home-kicker home-kicker-light">Hereinspaziert</p>
					<h2 className="mx-auto mb-6 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
						Bereit für dein Zirkusabenteuer?
					</h2>
					<p className="mx-auto mb-9 max-w-2xl text-xl text-white/85">
						Komm zum Schnuppern vorbei oder frag uns nach dem passenden Angebot.
					</p>
					<div className="flex flex-col justify-center gap-4 sm:flex-row">
						<Button to="/kontakt" variant="accent" size="lg">Kontakt aufnehmen</Button>
						<Button to="/termine" variant="inverse" size="lg">Termine ansehen</Button>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Home;
