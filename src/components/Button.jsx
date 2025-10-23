const Button = ({
	children,
	variant = "primary",
	size = "md",
	onClick,
	href,
	className = "",
	...props
}) => {
	const baseStyles =
		"inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

	const variants = {
		primary: "bg-circus-red text-white hover:bg-red-700 focus:ring-circus-red",
		secondary:
			"bg-circus-blue text-white hover:bg-blue-700 focus:ring-circus-blue",
		accent:
			"bg-circus-yellow text-gray-900 hover:bg-yellow-500 focus:ring-circus-yellow",
		outline:
			"border-2 border-circus-red text-circus-red hover:bg-circus-red hover:text-white focus:ring-circus-red",
	};

	const sizes = {
		sm: "px-4 py-2 text-sm",
		md: "px-6 py-3 text-base",
		lg: "px-8 py-4 text-lg",
	};

	const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

	if (href) {
		return (
			<a href={href} className={classes} {...props}>
				{children}
			</a>
		);
	}

	return (
		<button onClick={onClick} className={classes} {...props}>
			{children}
		</button>
	);
};

export default Button;
