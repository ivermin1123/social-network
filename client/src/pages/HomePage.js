import React, { useState } from "react";
import Logo from "../Icons/Logo1";
import LogoWhite from "../Icons/LogoWhite";
import Sprite from "../Icons/Sprite";
import Wrapper from "../components/HomePage/Wrapper";

function HomePage() {
	const [open, setOpen] = useState(false);
	const handleOpen = () => {
		if (open) {
			setOpen(false);
		} else {
			setOpen(true);
		}
	};
	return (
		<div className={`page${open ? " toggle" : ""}`}>
			<div className={`sidebar${open ? " active" : ""}`}>
				<div className="sidebar__top">
					<a className="sidebar__logo" href="/">
						<Logo className="sidebar__pic sidebar__pic_black" />
						<LogoWhite className="sidebar__pic sidebar__pic_white" />
					</a>
					<button
						type="button"
						className="sidebar__burger"
						onClick={handleOpen}
					/>
					<button type="button" className="sidebar__close">
						<Sprite className="icon icon-close" />
					</button>
				</div>
				<Wrapper />
			</div>
		</div>
	);
}

export default HomePage;
