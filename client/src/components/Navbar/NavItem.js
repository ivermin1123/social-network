import React, { useState } from "react";

export default function NavItem(props) {
	const [open, setOpen] = useState(false);
	const { icon, children } = props;
	return (
		<li className="nav-item">
			<button
				type="button"
				className="icon-button"
				onClick={() => setOpen(!open)}
			>
				{icon}
			</button>

			{open && children}
		</li>
	);
}
