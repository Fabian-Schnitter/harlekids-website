const MomentsGallery = ({
	items,
	eyebrow = "Echte Einblicke",
	title = "So fühlt sich Harlekids an",
	className = "",
}) => (
	<section className={`moments-gallery py-14 md:py-20 ${className}`}>
		<div className="container mx-auto px-4">
			<div className="mb-9 max-w-3xl">
				<p className="home-kicker">{eyebrow}</p>
				<h2 className="text-4xl font-black tracking-tight text-gray-900 md:text-5xl">
					{title}
				</h2>
			</div>
			<div className="moments-grid">
				{items.map((item, index) => (
					<figure key={item.src} className={`moment-card moment-card-${index + 1}`}>
						<img
							src={item.src}
							alt={item.alt}
							loading="lazy"
							decoding="async"
							style={item.position ? { objectPosition: item.position } : undefined}
						/>
						{item.caption && <figcaption>{item.caption}</figcaption>}
					</figure>
				))}
			</div>
		</div>
	</section>
);

export default MomentsGallery;
