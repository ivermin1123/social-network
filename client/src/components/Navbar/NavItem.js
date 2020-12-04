import React, { useState } from "react";

export default function NavItem(props) {
	const [open, setOpen] = useState(false);
	const { icon, children } = props;
	return (
		<li className="nav-item">
			<a href="/#" className="icon-button" onClick={() => setOpen(!open)}>
				{icon}
			</a>

			{open && children}
		</li>
	);
}
