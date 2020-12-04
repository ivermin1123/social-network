import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Theme from "../../constants/Theme";
import { useState } from "react";
import { SearchBox } from "../_components";

const Navbar = ({ ...props }) => {
	const [display, setDisplay] = useState(false);
	const showSearch = (value) => {
		setDisplay(value);
	};
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
					<div className="nav-bar__navigation-icon">
						<FontAwesomeIcon
							className="icon"
							icon={Theme.ICONS.home}
						/>
					</div>
					<div className="nav-bar__navigation-icon">
						<FontAwesomeIcon
							className="icon"
							icon={Theme.ICONS.users}
						/>
					</div>
					<div className="nav-bar__navigation-icon">
						<FontAwesomeIcon
							className="icon"
							icon={Theme.ICONS.tv}
						/>
					</div>
				</div>
				<div className="nav-bar__right-items col">
					<div className="navbar-nav">
						<Link to="/account">
							<div className="nav-bar__info">
								<img
									className="nav-bar__avt"
									src="https://znews-photo.zadn.vn/w660/Uploaded/bpmoqwq1/2014_10_16/con_meo.jpg"
									alt="avt"
								/>
								<div className="nav-bar__name">Tú Vip</div>
							</div>
						</Link>
						{props.children}
					</div>
				</div>
			</div>
			<div style={{ display: display ? "block" : "none" }}>
				<SearchBox showSearch={showSearch} />
			</div>
		</div>
	);
};

export default Navbar;
