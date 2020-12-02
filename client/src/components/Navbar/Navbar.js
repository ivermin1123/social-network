import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Theme from "../../constants/Theme";

const Navbar = ({ ...props }) => {
	return (
		<Row className="nav-bar">
			<Col className="nav-bar__left-items">
				<Link to="/">
					<img
						className="nav-bar__logo"
						src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-facebook-2019-square2-512.png"
						alt=""
					/>
				</Link>
				<input
					className="nav-bar__search-bar"
					type="text"
					placeholder="Tìm kiếm trên Fakebook"
				/>
			</Col>
			<Col className="nav-bar__navigation">
				<div className="nav-bar__navigation-icon">
					<FontAwesomeIcon className="icon" icon={Theme.ICONS.home} />
				</div>
				<div className="nav-bar__navigation-icon">
					<FontAwesomeIcon
						className="icon"
						icon={Theme.ICONS.users}
					/>
				</div>
				<div className="nav-bar__navigation-icon">
					<FontAwesomeIcon className="icon" icon={Theme.ICONS.tv} />
				</div>
			</Col>
			<Col
				// style={{
				// 	display: "flex",
				// }}
				className="nav-bar__right-items"
			>
				<ul className="navbar-nav">
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
				</ul>
			</Col>
		</Row>
	);
};

export default Navbar;
