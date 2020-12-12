import React, { useState } from "react";
import logo from "../assets/icons/logo_1.svg";
import logoWhite from "../assets/icons/logo-white.svg";
import Wrapper from "../components/SideBar/Wrapper";
import BottomControl from "../components/SideBar/BottomControl";
import Header from "../components/MainContent/Header";
import sprite from "../assets/icons/sprite.svg";

function HomePage() {
	const [open, setOpen] = useState(false);
	const handleOpen = () => {
		setOpen(!open);
	};
	return (
		<div className={`page${open ? " toggle" : ""}`}>
			<div className={`sidebar${open ? " active" : ""}`}>
				<div className="sidebar__top">
					<a className="sidebar__logo" href="/">
						<img
							src={logo}
							className="sidebar__pic sidebar__pic_black"
							alt=""
						/>
						<img
							src={logoWhite}
							className="sidebar__pic sidebar__pic_white"
							alt=""
						/>
					</a>
					<button
						type="button"
						className="sidebar__burger"
						onClick={handleOpen}
					/>
					<button type="button" className="sidebar__close">
						<svg className="icon icon-close">
							<use href={`${sprite}#icon-close`} />
						</svg>
					</button>
				</div>
				<Wrapper />
				<BottomControl />
			</div>
			<div className="page__wrapper">
				<Header />
			</div>
		</div>
	);
}

export default HomePage;
