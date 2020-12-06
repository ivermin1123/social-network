import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function NavItem(props) {
	const [open, setOpen] = useState(false);
	const { icon, children, href } = props;

	return (
		<li className="nav-item">
			<Link
				to={href || "/#"}
				className="icon-button"
				onClick={() => setOpen(!open)}
			>
				{icon}{" "}
			</Link>

			{open && children}
		</li>
	);
}
