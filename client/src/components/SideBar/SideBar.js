import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
	connect as connectSocket,
	disconnect as disconnectSocket,
} from "../../actions/socket.actions";
import userActions from "../../actions/user.actions";

import logo from "../../assets/image/logo_hutech_1.png";
import logoWhite from "../../assets/image/logo_hutech_2.png";
import Wrapper from "./Wrapper";
import BottomControl from "./BottomControl";
import sprite from "../../assets/icons/sprite.svg";

function SideBar(props) {
	const dispatch = useDispatch();
	const { loadingUser, isOpen, handleOpen, user } = props;

	useEffect(() => {
		dispatch(connectSocket());
		dispatch(userActions.getUser(user._id));
		// CLEAN UP THE EFFECT
		return () => dispatch(disconnectSocket());
		//
	}, []);

	return loadingUser === false ? (
		<div className={`sidebar${isOpen ? " active" : ""}`}>
			<div className="sidebar__top">
				<Link className="sidebar__logo" to="/">
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
				</Link>
				<button
					type="button"
					className="sidebar__burger"
					onClick={handleOpen}
				/>
				<button
					type="button"
					className="sidebar__close"
					onClick={handleOpen}
				>
					<svg className="icon icon-close">
						<use href={`${sprite}#icon-close`} />
					</svg>
				</button>
			</div>
			<Wrapper />
			<BottomControl />
		</div>
	) : null;
}

const mapStateToProps = (state) => ({
	loadingUser: state.users.loadingUser,
});

export default connect(mapStateToProps)(SideBar);
// export default SideBar;
