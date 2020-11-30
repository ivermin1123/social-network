import React from "react";

import { Row, Col } from "react-bootstrap";
import { faHome, faUsers, faTv } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar(props) {
	return (
		<Row className="nav-bar">
			<Col className="nav-bar__left-items">
				<img
					className="nav-bar__logo"
					src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-facebook-2019-square2-512.png"
					alt=""
				/>
				<input
					className="nav-bar__search-bar"
					type="text"
					placeholder="Tìm kiếm trên Fakebook"
				/>
			</Col>
			<Col className="nav-bar__navigation">
				<FontAwesomeIcon
					className={"nav-bar__navigation-icon"}
					icon={faHome}
				/>
				<FontAwesomeIcon
					className={"nav-bar__navigation-icon"}
					icon={faUsers}
				/>
				<FontAwesomeIcon
					className={"nav-bar__navigation-icon"}
					icon={faTv}
				/>
			</Col>
			<Col
				// style={{
				// 	display: "flex",
				// }}
				className="nav-bar__right-items"
			>
				<ul className="navbar-nav">
					<div className="nav-bar__info">
						<img
							className="nav-bar__avt"
							src="https://znews-photo.zadn.vn/w660/Uploaded/bpmoqwq1/2014_10_16/con_meo.jpg"
							alt="avt"
						/>
						<div className="nav-bar__name">Tú Vip</div>
					</div>
					{props.children}
				</ul>
			</Col>
		</Row>
	);
}

export default Navbar;
