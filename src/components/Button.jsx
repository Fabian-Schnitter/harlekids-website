import { Link } from "react-router-dom";

const Button = ({
	children,
	variant = "primary",
	size = "md",
	onClick,
	to,
	href,
	className = "",
	...props
}) => {
	const baseStyles =
		"inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

	const variants = {
		primary: "bg-circus-red text-white hover:brightness-90 focus:ring-circus-red",
		secondary:
			"bg-circus-blue text-white hover:brightness-90 focus:ring-circus-blue",
		accent:
			"bg-circus-yellow text-gray-900 hover:brightness-90 focus:ring-circus-yellow",
		outline:
			"border-2 border-circus-red text-circus-red hover:bg-circus-red hover:text-white focus:ring-circus-red",
		inverse:
			"border-2 border-white text-white hover:border-white hover:bg-white hover:text-gray-900 focus:ring-white",
	};

	const sizes = {
		sm: "px-4 py-2 text-sm",
		md: "px-6 py-3 text-base",
		lg: "px-8 py-4 text-lg",
	};

	const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

	if (to) {
		return (
			<Link to={to} className={classes} {...props}>
				{children}
			</Link>
		);
	}

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
