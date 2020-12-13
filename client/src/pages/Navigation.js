import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import {
	connect as connectSocket,
	disconnect as disconnectSocket,
} from "../actions/socket.actions";
import logo from "../assets/icons/logo_1.svg";
import logoWhite from "../assets/icons/logo-white.svg";
import Wrapper from "../components/SideBar/Wrapper";
import BottomControl from "../components/SideBar/BottomControl";
import Header from "../components/MainContent/Header";
import sprite from "../assets/icons/sprite.svg";

function Navigation(props) {
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();
	const { children } = props;
	const handleOpen = () => {
		setOpen(!open);
	};

	console.log("RENDER 😎");
	useEffect(() => {
		console.log("CONNECT SOCKET CLIENT 😛");
		dispatch(connectSocket());

		// CLEAN UP THE EFFECT
		return () => dispatch(disconnectSocket());
		//
	}, []);

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
				<div className="main js-main" />
				<div className="page__center" id="main-content">
					{children}
				</div>
			</div>
		</div>
	);
}

export default Navigation;
