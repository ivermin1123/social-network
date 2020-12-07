import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Theme } from "../../constants/index";
import { SearchBox } from "../_components";

const Navbar = ({ ...props }) => {
	const [display, setDisplay] = useState(false);
	const { user } = useSelector((state) => state.authentication.user);
	const fullName = `${user.firstName} ${user.lastName}`;
	const showSearch = (value) => {
		setDisplay(value);
	};
	const { children } = props;

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
						<Link to="/account">
							<div className="nav-bar__info">
								<img
									className="nav-bar__avt"
									src="https://znews-photo.zadn.vn/w660/Uploaded/bpmoqwq1/2014_10_16/con_meo.jpg"
									alt="avt"
								/>
								<div className="nav-bar__name">{fullName}</div>
							</div>
						</Link>
						{children}
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
