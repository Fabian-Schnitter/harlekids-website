import Button from "./Button";

const Hero = ({
	title,
	subtitle,
	eyebrow,
	backgroundImage,
	primaryCTA,
	secondaryCTA,
	height = "min-h-[32rem] md:min-h-[38rem]",
	overlay = true,
}) => {
	return (
		<div
			className={`circus-hero relative ${height} flex items-center justify-center bg-cover bg-center`}
			style={{ backgroundImage: `url(${backgroundImage})` }}
		>
			{/* Overlay */}
			{overlay && (
				<div className="absolute inset-0 bg-black/45"></div>
			)}

			{/* Content */}
			<div className="relative z-10 container mx-auto px-4 text-center text-white">
				{eyebrow && <p className="hero-eyebrow">{eyebrow}</p>}
				<h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
					{title}
				</h1>
				{subtitle && (
					<p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fade-in-delay">
						{subtitle}
					</p>
				)}
				<div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
					{primaryCTA && (
						<Button to={primaryCTA.link} variant="accent" size="lg">
							{primaryCTA.text}
						</Button>
					)}
					{secondaryCTA && (
						secondaryCTA.link.startsWith("#") ? (
							<Button href={secondaryCTA.link} variant="inverse" size="lg">
								{secondaryCTA.text}
							</Button>
						) : (
							<Button to={secondaryCTA.link} variant="inverse" size="lg">
								{secondaryCTA.text}
							</Button>
						)
					)}
				</div>
			</div>

		</div>
	);
};

export default Hero;
