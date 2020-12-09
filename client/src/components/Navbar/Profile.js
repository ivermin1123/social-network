import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Profile() {
	const { user } = useSelector((state) => state.authentication.user);
	const fullName = `${user.firstName} ${user.lastName}`;
	return (
		<>
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
		</>
	);
}

export default Profile;
