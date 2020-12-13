import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";

import {
	connect as connectSocket,
	disconnect as disconnectSocket,
} from "../actions/socket.actions";
import userActions from "../actions/user.actions";
import logo from "../assets/icons/logo_1.svg";
import logoWhite from "../assets/icons/logo-white.svg";
import Wrapper from "../components/SideBar/Wrapper";
import BottomControl from "../components/SideBar/BottomControl";
import Header from "../components/MainContent/Header";
import sprite from "../assets/icons/sprite.svg";

function Navigation(props) {
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();
	const { children, loadingUser } = props;
	const { user } = useSelector((state) => state.authentication.user);
	const handleOpen = () => {
		setOpen(!open);
	};

	console.log("RENDER 😎");
	useEffect(() => {
		console.log("CONNECT SOCKET CLIENT 😛");
		dispatch(connectSocket());
		dispatch(userActions.getUser(user._id));

		// CLEAN UP THE EFFECT
		return () => dispatch(disconnectSocket());
		//
	}, []);

	if (loadingUser) {
		return (
			<div className={`page${open ? " toggle" : ""}`}>
				<LoadingOutlined
					style={{ fontSize: "50px", color: "#08c", margin: "auto" }}
				/>
			</div>
		);
	}
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
				{children}
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	loadingUser: state.users.loadingUser,
});

export default connect(mapStateToProps)(Navigation);
