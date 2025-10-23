import { useState, useEffect } from "react";
import Section from "../components/Section";
import Card from "../components/Card";
import Button from "../components/Button";
import { FaCalendar, FaUser, FaTag } from "react-icons/fa";
import { loadBlogPosts, markdownToHtml } from "../utils/contentLoader";

const Blog = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedCategory, setSelectedCategory] = useState("all");

	useEffect(() => {
		loadBlogPosts().then((data) => {
			setPosts(data);
			setLoading(false);
		});
	}, []);

	// Fallback zu Demo-Daten wenn keine Posts im CMS
	const blogPosts = posts.length > 0 ? posts : [
		{
			id: 1,
			title: "Auch im nächsten Jahr Ferien im Zirkus",
			date: "23. Februar 2025",
			author: "Kathi",
			category: "Zirkusferien",
			excerpt:
				"Hier findet ihr alle Infos zu den Zirkusferien 2025. Die Termine stehen fest und die Anmeldung ist ab sofort möglich!",
			image:
				"https://images.unsplash.com/photo-1464047736614-af63643285bf?w=800&h=600&fit=crop",
			content: "Vollständiger Artikel-Inhalt...",
		},
		{
			id: 2,
			title: "Trainingstermine aktualisiert",
			date: "11. März 2023",
			author: "Kathi",
			category: "Jugendzirkus",
			excerpt:
				"Wir haben unser Trainingsangebot für euch aktualisiert. Kommt vorbei und probiert euch aus.",
			image:
				"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
			content: "Vollständiger Artikel-Inhalt...",
		},
		{
			id: 3,
			title: "Juleica-Schulung erfolgreich abgeschlossen",
			date: "06. Juli 2022",
			author: "Steffen",
			category: "Ausbildung",
			excerpt:
				"Am Wochenende vom 17.06.22 – 19.06.22 fand das vierte und damit letzte Juleica-Wochenende statt. Schwerpunkt war der Erste-Hilfe-Kurs.",
			image:
				"https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=600&fit=crop",
			content: "Vollständiger Artikel-Inhalt...",
		},
		{
			id: 4,
			title: "Fortbildung Social Circus 2022",
			date: "01. Juni 2022",
			author: "Steffen",
			category: "Fortbildung",
			excerpt:
				"Auch in diesem Jahr findet wieder ein Teil der Fortbildungsreihe Social Circus nach der Methode des Cirque du Soleil statt.",
			image:
				"https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop",
			content: "Vollständiger Artikel-Inhalt...",
		},
		{
			id: 5,
			title: "Die Harlekids auf Schloss Trebnitz",
			date: "27. März 2019",
			author: "Admin",
			category: "Allgemein",
			excerpt:
				"Auch in diesem Jahr waren wir wieder Gäste auf Schloss Trebnitz und haben im Rahmen der INISEK die Kennenlernwochen mehrerer 7. Klassen begleitet.",
			image:
				"https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop",
			content: "Vollständiger Artikel-Inhalt...",
		},
		{
			id: 6,
			title: "Sommerfest 2024 - Ein voller Erfolg!",
			date: "15. Juli 2024",
			author: "Kathi",
			category: "Festival",
			excerpt:
				"Bei strahlendem Sonnenschein feierten wir unser jährliches Sommerfest. Über 200 Gäste kamen, um unsere Shows zu sehen.",
			image:
				"https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop",
			content: "Vollständiger Artikel-Inhalt...",
		},
	];

	// Extrahiere eindeutige Kategorien aus den Posts
	const categories = ["all", ...new Set(blogPosts.map(post => post.category).filter(Boolean))];

	const filteredPosts =
		selectedCategory === "all"
			? blogPosts
			: blogPosts.filter((post) => post.category === selectedCategory);

	return (
		<div className="min-h-screen">
			{/* Hero */}
			<Section backgroundColor="blue" className="text-white text-center py-20">
				<h1 className="text-5xl md:text-6xl font-bold mb-6">News & Blog</h1>
				<p className="text-xl max-w-3xl mx-auto">
					Aktuelles aus der Harlekids-Welt – von Veranstaltungen über
					Erfolgsgeschichten bis zu Einblicken hinter die Kulissen.
				</p>
			</Section>

			{/* Filter */}
			<Section>
				{loading ? (
					<div className="text-center py-12">
						<p className="text-xl text-gray-600">Lade Blog-Posts...</p>
					</div>
				) : (
					<>
						<div className="flex flex-wrap justify-center gap-3 mb-12">
							{categories.map((category) => (
								<button
									key={category}
									onClick={() => setSelectedCategory(category)}
									className={`px-6 py-2 rounded-full font-semibold transition-all ${
										selectedCategory === category
											? "bg-circus-red text-white"
											: "bg-gray-200 text-gray-700 hover:bg-gray-300"
									}`}
								>
									{category === "all" ? "Alle" : category}
								</button>
							))}
						</div>

						{/* Blog Posts Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{filteredPosts.map((post, index) => (
								<Card key={post.slug || post.id || index} className="flex flex-col">
									{post.image && (
										<div className="relative h-56 overflow-hidden rounded-t-xl">
											<img
												src={post.image}
												alt={post.title}
												className="w-full h-full object-cover"
											/>
											{post.category && (
												<div className="absolute top-4 left-4 bg-circus-yellow text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
													<FaTag className="inline mr-1" />
													{post.category}
												</div>
											)}
										</div>
									)}

									<div className="p-6 flex-grow flex flex-col">
										<div className="flex items-center text-sm text-gray-600 mb-3 space-x-4">
											<span className="flex items-center">
												<FaCalendar className="mr-1 text-circus-red" />
												{post.date ? new Date(post.date).toLocaleDateString('de-DE', {
													day: '2-digit',
													month: 'long',
													year: 'numeric'
												}) : ''}
											</span>
											{post.author && (
												<span className="flex items-center">
													<FaUser className="mr-1 text-circus-red" />
													{post.author}
												</span>
											)}
										</div>

										<h3 className="text-xl font-bold text-gray-900 mb-3">
											{post.title}
										</h3>
										
										<div className="text-gray-600 mb-6 flex-grow line-clamp-3">
											{post.excerpt || (post.body && post.body.substring(0, 150) + '...')}
										</div>

										<Button variant="outline" size="sm" className="w-full">
											Weiterlesen
										</Button>
									</div>
								</Card>
							))}
						</div>

						{filteredPosts.length === 0 && (
							<div className="text-center py-12">
								<p className="text-gray-600 text-lg">
									{selectedCategory === 'all' 
										? 'Noch keine Blog-Posts vorhanden. Erstellt welche im CMS!'
										: 'Keine Beiträge in dieser Kategorie gefunden.'}
								</p>
							</div>
						)}
					</>
				)}
			</Section>

			{/* Newsletter Subscription */}
			{/* CMS NOTE: Newsletter über CMS verwalten */}
			<Section backgroundColor="red" className="text-white text-center">
				<h2 className="text-4xl font-bold mb-6">Bleib informiert!</h2>
				<p className="text-xl mb-8 max-w-2xl mx-auto">
					Melde dich für unseren Newsletter an und erhalte regelmäßig News,
					Termine und spannende Geschichten direkt in dein Postfach.
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
					Kein Spam, versprochen! Du kannst dich jederzeit wieder abmelden.
				</p>
			</Section>

			{/* Archiv Hinweis */}
			<Section backgroundColor="gray">
				<div className="text-center max-w-3xl mx-auto">
					<h2 className="text-3xl font-bold mb-4 text-gray-900">
						Auf der Suche nach älteren Beiträgen?
					</h2>
					<p className="text-lg text-gray-700 mb-6">
						In unserem Archiv findest du alle vergangenen News und Berichte aus
						den letzten Jahren.
					</p>
					<Button variant="primary" size="lg">
						Zum Archiv
					</Button>
				</div>
			</Section>
		</div>
	);
};

export default Blog;
