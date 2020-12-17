import React from "react";
import ava from "../../assets/image/ava-1.png";

const AuthorDetail = ({ ...props }) => {
	const { userData } = props;
	return (
		<div className="author__details">
			<div className="ava ava_online">
				{userData.infoUser.avatar ? (
					<img
						className="ava__pic"
						src={userData.infoUser.avatar}
						alt=""
					/>
				) : (
					<img className="ava__pic" src={ava} alt="" />
				)}
			</div>
			<div className="author__wrap">
				<div className="author__man h2 confirm">
					{userData.infoUser.firstName
						? `${userData.infoUser.firstName} `
						: ""}
					{userData.infoUser.lastName || ""}
				</div>
				<div className="author__parameters">
					<div className="author__parameter h6">
						{userData.infoUser.followers
							? `${userData.infoUser.followers.length} người theo dõi`
							: `${userData.infoUser.friends.length} bạn bè` ||
							  ""}
					</div>
					<div className="author__parameter h6">120 videos</div>
				</div>
			</div>
		</div>
	);
};

export default AuthorDetail;
