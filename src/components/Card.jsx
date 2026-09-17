const Card = ({
	children,
	title,
	image,
	imageAlt = "",
	imagePosition = "center",
	icon: Icon,
	accentColor,
	className = "",
	hoverable = true,
	...props
}) => {
	const hoverStyles = hoverable ? "hover:shadow-md" : "";

	return (
		<div
			className={`bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transition-shadow duration-200 ${hoverStyles} ${className}`}
			style={accentColor ? { "--card-accent": accentColor } : undefined}
			{...props}
		>
			{image && (
				<div className="relative h-64 overflow-hidden">
					<img
						src={image}
						alt={imageAlt}
						loading="lazy"
						decoding="async"
						className="w-full h-full object-cover"
						style={{ objectPosition: imagePosition }}
					/>
				</div>
			)}
			<div className="p-6">
				{Icon && (
					<div
						className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full text-white shadow-md"
						style={{ backgroundColor: accentColor || "var(--color-circus-red)" }}
						aria-hidden="true"
					>
						<Icon size={22} />
					</div>
				)}
				{title && (
					<h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
				)}
				{children}
			</div>
		</div>
	);
};

export default Card;
