import { Link } from "react-router-dom";
import Button from "./Button";

const Hero = ({
	title,
	subtitle,
	backgroundImage,
	primaryCTA,
	secondaryCTA,
	height = "h-screen",
	overlay = true,
}) => {
	return (
		<div
			className={`relative ${height} flex items-center justify-center bg-cover bg-center`}
			style={{ backgroundImage: `url(${backgroundImage})` }}
		>
			{/* Overlay */}
			{overlay && (
				<div className="absolute inset-0 bg-black bg-opacity-50"></div>
			)}

			{/* Content */}
			<div className="relative z-10 container mx-auto px-4 text-center text-white">
				<h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
					{title}
				</h1>
				{subtitle && (
					<p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fade-in-delay">
						{subtitle}
					</p>
				)}
				<div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
					{primaryCTA && (
						<Link to={primaryCTA.link}>
							<Button variant="accent" size="lg">
								{primaryCTA.text}
							</Button>
						</Link>
					)}
					{secondaryCTA && (
						<Link to={secondaryCTA.link}>
							<Button
								variant="outline"
								size="lg"
								className="border-white text-white hover:bg-white hover:text-gray-900"
							>
								{secondaryCTA.text}
							</Button>
						</Link>
					)}
				</div>
			</div>

			{/* Scroll Indicator */}
			<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
				<div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
					<div className="w-1 h-3 bg-white rounded-full"></div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
