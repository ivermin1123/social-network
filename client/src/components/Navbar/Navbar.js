import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import socketActions from "../../actions/socket.actions";
import { Theme } from "../../constants/index";
import { SearchBox } from "../_components";

const Navbar = ({ ...props }) => {
	const dispatch = useDispatch();
	const [display, setDisplay] = useState(false);
	const { user } = useSelector((state) => state.authentication.user);
	const fullName = `${user.firstName} ${user.lastName}`;
	const showSearch = (value) => {
		setDisplay(value);
	};

	useEffect(() => {
		dispatch(socketActions.connect());
	}, []);
	const { children } = props;

	return (
		<div className="nav-bar">
			<div className="nav-bar-fixed row">
				<div className="nav-bar__left-items col">
					<div className="left-item-content">
						<Link to="/">
							<img
								className="nav-bar__logo"
								src="https://scontent.fvca1-2.fna.fbcdn.net/v/t1.0-9/119006919_2630686663849214_7588642771909915890_o.jpg?_nc_cat=104&ccb=2&_nc_sid=730e14&_nc_ohc=oYe86sMlZaUAX8luzCb&_nc_ht=scontent.fvca1-2.fna&oh=8b21dc4e660658cf1e0cb6463352f220&oe=5FF3FE38"
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
