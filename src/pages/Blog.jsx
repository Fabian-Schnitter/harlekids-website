import { useState, useEffect } from "react";
import Section from "../components/Section";
import Button from "../components/Button";
import { FaCalendar, FaSearch, FaUser } from "react-icons/fa";
import { loadBlogPosts, markdownToHtml } from "../utils/contentLoader";

const Blog = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [selectedYear, setSelectedYear] = useState("all");
	const [searchTerm, setSearchTerm] = useState("");
	const [expandedPost, setExpandedPost] = useState(null);
	const [visibleCount, setVisibleCount] = useState(8);

	useEffect(() => {
		loadBlogPosts().then((data) => {
			setPosts(data);
			setLoading(false);
		});
	}, []);

	// Fallback zu Demo-Daten wenn keine Posts im CMS
	const blogPosts =
		posts.length > 0
			? posts
			: [
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
						category: "Fortbildungen",
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
						category: "Fortbildungen",
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
						category: "Ausflüge",
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
						category: "Events",
						excerpt:
							"Bei strahlendem Sonnenschein feierten wir unser jährliches Sommerfest. Über 200 Gäste kamen, um unsere Shows zu sehen.",
						image:
							"https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop",
						content: "Vollständiger Artikel-Inhalt...",
					},
				];

	// Extrahiere eindeutige Kategorien aus den Posts
	const categories = [
		"all",
		...new Set(blogPosts.map((post) => post.category).filter(Boolean)),
	];
	const getPostYear = (date) => String(date || "").match(/\b(?:19|20)\d{2}\b/)?.[0] || "";
	const years = [...new Set(blogPosts.map((post) => getPostYear(post.date)).filter(Boolean))]
		.sort((a, b) => Number(b) - Number(a));
	const normalizedSearch = searchTerm.trim().toLocaleLowerCase("de-DE");

	const filteredPosts = blogPosts.filter((post) => {
		const matchesCategory =
			selectedCategory === "all" || post.category === selectedCategory;
		const matchesYear = selectedYear === "all" || getPostYear(post.date) === selectedYear;
		const searchableText = [
			post.title,
			post.excerpt,
			post.body,
			post.content,
			post.category,
			post.author,
		]
			.filter(Boolean)
			.join(" ")
			.toLocaleLowerCase("de-DE");
		const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch);

		return matchesCategory && matchesYear && matchesSearch;
	});
	const visiblePosts = filteredPosts.slice(0, visibleCount);

	return (
		<div className="min-h-screen">
			{/* Hero */}
			<Section backgroundColor="blue" className="circus-blog-hero text-white text-center py-14 md:py-16">
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
						<div className="blog-tools mb-8">
							<label className="blog-search-field">
								<span>Beiträge durchsuchen</span>
								<div>
									<FaSearch aria-hidden="true" />
									<input
										type="search"
										value={searchTerm}
										onChange={(event) => {
											setSearchTerm(event.target.value);
											setVisibleCount(8);
											setExpandedPost(null);
										}}
										placeholder="Titel oder Stichwort eingeben"
									/>
								</div>
							</label>

							<label className="blog-year-field">
								<span>Nach Jahr filtern</span>
								<select
									value={selectedYear}
									onChange={(event) => {
										setSelectedYear(event.target.value);
										setVisibleCount(8);
										setExpandedPost(null);
									}}
								>
									<option value="all">Alle Jahre</option>
									{years.map((year) => (
										<option key={year} value={year}>{year}</option>
									))}
								</select>
							</label>

							{(searchTerm || selectedYear !== "all" || selectedCategory !== "all") && (
								<Button
									variant="outline"
									size="sm"
									onClick={() => {
										setSearchTerm("");
										setSelectedYear("all");
										setSelectedCategory("all");
										setVisibleCount(8);
										setExpandedPost(null);
									}}
								>
									Filter zurücksetzen
								</Button>
							)}
						</div>

						<div className="flex flex-wrap justify-center gap-3 mb-12">
							{categories.map((category) => (
								<button
									key={category}
									onClick={() => {
										setSelectedCategory(category);
										setVisibleCount(8);
										setExpandedPost(null);
									}}
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

						<div className="blog-list">
							{visiblePosts.map((post, index) => {
								const postId = post.slug || post.id || index;
								const isExpanded = expandedPost === postId;

								return (
								<article
									key={postId}
									className="blog-list-item"
								>
									<div className="blog-list-meta">
										{post.category && <strong>{post.category}</strong>}
										<span className="flex items-center">
												<FaCalendar className="mr-1 text-circus-red" />
												{post.date
													? new Date(post.date).toLocaleDateString("de-DE", {
															day: "2-digit",
															month: "long",
															year: "numeric",
														})
													: ""}
										</span>
										{post.author && (
											<span className="flex items-center">
													<FaUser className="mr-1 text-circus-red" />
													{post.author}
											</span>
										)}
									</div>

									<div className="blog-list-copy">
										<h2>
											{post.title}
										</h2>

										<div className="text-gray-600 leading-relaxed line-clamp-2">
											{post.excerpt ||
												(post.body && post.body.substring(0, 150) + "...")}
										</div>
									</div>

									<Button
										variant="outline"
										size="sm"
										className="blog-list-button"
										onClick={() => setExpandedPost(isExpanded ? null : postId)}
										aria-expanded={isExpanded}
									>
										{isExpanded ? "Schließen" : "Weiterlesen"}
									</Button>

									{isExpanded && (
										<div
											className="blog-list-content text-gray-700"
												dangerouslySetInnerHTML={{
													__html: markdownToHtml(
														post.content || post.body || post.excerpt,
													),
												}}
										/>
									)}
								</article>
								);
							})}
						</div>

						{visibleCount < filteredPosts.length && (
							<div className="mt-10 text-center">
								<Button
									variant="primary"
									size="lg"
									onClick={() => setVisibleCount((count) => count + 8)}
								>
									Mehr Beiträge anzeigen
								</Button>
							</div>
						)}

						{filteredPosts.length === 0 && (
							<div className="text-center py-12">
								<p className="text-gray-600 text-lg">
									Keine Beiträge für diese Suche gefunden.
								</p>
							</div>
						)}
					</>
				)}
			</Section>
		</div>
	);
};

export default Blog;
