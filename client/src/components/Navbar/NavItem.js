import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function NavItem(props) {
	const [open, setOpen] = useState(false);
	const { icon, children, href } = props;

	return (
		<li className="nav-item">
			{href ? (
				<Link
					to={href}
					className="icon-button"
					onClick={() => setOpen(!open)}
				>
					{icon}
				</Link>
			) : (
				<button
					type="button"
					className="icon-button"
					onClick={() => setOpen(!open)}
				>
					{icon}
				</button>
			)}

			{open && children}
		</li>
	);
}
