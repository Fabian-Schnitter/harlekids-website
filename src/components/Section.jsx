const Section = ({
	children,
	title,
	subtitle,
	className = "",
	backgroundColor = "white",
	id,
	...props
}) => {
	const bgColors = {
		white: "bg-white",
		gray: "bg-gray-50",
		red: "bg-circus-red text-white",
		blue: "bg-circus-blue text-white",
		yellow: "bg-circus-yellow",
	};

	return (
		<section
			id={id}
			className={`py-12 md:py-16 ${bgColors[backgroundColor]} ${className}`}
			{...props}
		>
			<div className="container mx-auto px-4">
				{(title || subtitle) && (
					<div className="text-center mb-12">
						{subtitle && (
							<p className="text-circus-red font-semibold text-sm uppercase tracking-wide mb-2">
								{subtitle}
							</p>
						)}
						{title && (
							<h2 className="circus-title text-4xl md:text-5xl font-bold text-gray-900 mb-4">
								{title}
							</h2>
						)}
					</div>
				)}
				{children}
			</div>
		</section>
	);
};

export default Section;
