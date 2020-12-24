import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";

import { Theme } from "../../constants/index";
import Profile from "./Profile";
import { SearchBox, NavItem, DropdownMenu } from "../_components";
import {
	connect as connectSocket,
	disconnect as disconnectSocket,
} from "../../actions/socket.actions";
import {
	BellIcon,
	MessengerIcon,
	CaretIcon,
	PlusIcon,
} from "../../Icons/_icon";

function NavbarLoaded(props) {
	const [display, setDisplay] = useState(false);
	const dispatch = useDispatch();
	const { conversationOpen } = useSelector((state) => state.conversations);
	const showSearch = (value) => {
		setDisplay(value);
	};
	const { isConnecting } = props;
	useEffect(() => {
		dispatch(connectSocket());
		// CLEAN UP THE EFFECT
		return () => dispatch(disconnectSocket());
		//
	}, []);
	if (!isConnecting) {
		return <LoadingOutlined />;
	}
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
							href={`/message/${conversationOpen.id}`}
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
}

const mapStateToProps = (state) => ({
	isConnecting: state.socket.isConnecting,
});

const connectedNavbar = connect(mapStateToProps)(NavbarLoaded);
export { connectedNavbar as default };
