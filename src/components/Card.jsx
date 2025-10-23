const Card = ({
	children,
	title,
	image,
	imageAlt = "",
	className = "",
	hoverable = true,
	...props
}) => {
	const hoverStyles = hoverable ? "hover:shadow-2xl hover:-translate-y-2" : "";

	return (
		<div
			className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${hoverStyles} ${className}`}
			{...props}
		>
			{image && (
				<div className="relative h-64 overflow-hidden">
					<img
						src={image}
						alt={imageAlt}
						className="w-full h-full object-cover"
					/>
				</div>
			)}
			<div className="p-6">
				{title && (
					<h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
				)}
				{children}
			</div>
		</div>
	);
};

export default Card;
