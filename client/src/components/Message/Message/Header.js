import React from "react";
import Logo from "../../../Icons/Logo";
import Settings from "../../../Icons/Settings";
import img5 from "../../../assets/image/avatar-5.png";

function Header() {
	return (
		<div className="col-header">
			<div className="container">
				<div className="left">
					<Logo />
				</div>

				<div className="middle">
					<h3>Vy</h3>
					<p>Messenger</p>
				</div>

				<div className="right">
					<div className="username">
						<div className="settings">
							<Settings />
						</div>
						Quốc Hoàng
					</div>

					<div className="avatar">
						<img alt="avatar" src={img5} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
