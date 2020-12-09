import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import io from "socket.io-client";
// eslint-disable-next-line import/no-unresolved
import config from "config";
import socketActions from "../../actions/socket.actions";
import { Theme } from "../../constants/index";
import Profile from "./Profile";
import { NavItem, DropdownMenu, SearchBox } from "../_components";
import {
	BellIcon,
	MessengerIcon,
	CaretIcon,
	PlusIcon,
} from "../../Icons/_icon";

const API_URL = config.apiUrl;

const Navbar = (props) => {
	const dispatch = useDispatch();
	const [display, setDisplay] = useState(false);

	const showSearch = (value) => {
		setDisplay(value);
	};
	const { loadingConversation, conversationOpen } = props;
	if (loadingConversation) {
		return null;
	}
	useEffect(() => {
		const socket = io(API_URL, {
			query: {
				token: JSON.parse(localStorage.getItem("user")).user.token,
			},
			transports: ["websocket"],
		});
		socket.once("connect", () => {
			dispatch(socketActions.connect(socket));
			socket.emit("TEST_VL", { hoang: 123 });
		});

		// CLEAN UP THE EFFECT
		return () => socket.close();
		//
	}, []);

	return (
		<div className="nav-bar">
			<div className="nav-bar-fixed row">
				<div className="nav-bar__left-items col">
					<div className="left-item-content">
						<Link to="/">
							<img
								className="nav-bar__logo"
								src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-facebook-2019-square2-512.png"
								alt="logo"
							/>
						</Link>
						<div className="nav-bar__search-bar">
							<button
								type="button"
								className="input-search-field"
								onClick={() => {
									setDisplay(true);
								}}
							>
								<FontAwesomeIcon
									className="icon"
									icon={Theme.ICONS.search}
								/>
								<p>Tìm kiếm trên Fakebook</p>
							</button>
						</div>
					</div>
				</div>
				<div className="nav-bar__navigation col">
					<div className="row">
						<Link to="/" className="nav-bar__navigation-icon">
							<FontAwesomeIcon
								className="icon"
								icon={Theme.ICONS.home}
							/>
						</Link>
						<Link to="/" className="nav-bar__navigation-icon">
							<FontAwesomeIcon
								className="icon"
								icon={Theme.ICONS.users}
							/>
						</Link>
						<Link to="/" className="nav-bar__navigation-icon">
							<FontAwesomeIcon
								className="icon"
								icon={Theme.ICONS.tv}
							/>
						</Link>
					</div>
				</div>
				<div className="nav-bar__right-items col">
					<div className="navbar-nav">
						<Profile />
						<NavItem icon={<PlusIcon />} />
						<NavItem icon={<BellIcon />} />
						<NavItem
							href={`/message/${conversationOpen}`}
							icon={<MessengerIcon />}
						/>
						<NavItem icon={<CaretIcon />}>
							<DropdownMenu />
						</NavItem>
					</div>
				</div>
			</div>
			<div style={{ display: display ? "block" : "none" }}>
				<SearchBox showSearch={showSearch} />
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	conversationOpen: state.conversations.conversationOpen,
	loadingConversation: state.conversations.loadingConversation,
});

const connectedNavbar = connect(mapStateToProps)(Navbar);
export { connectedNavbar as default };
