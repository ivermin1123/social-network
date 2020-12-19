import React from "react";
import ava from "../../assets/image/ava-1.png";
import LINK_CONSTANT from "../../constants/link.constants";

const AuthorDetail = ({ ...props }) => {
	const { userData } = props;
	return userData ? (
		<div className="author__details">
			<div className="ava ava_online">
				{userData.avatar && userData.avatar.length ? (
					<img
						className="ava__pic"
						src={`${LINK_CONSTANT.LINK_S3}${userData.avatar[0].path}`}
						alt=""
					/>
				) : (
					<img className="ava__pic" src={ava} alt="" />
				)}
			</div>
			<div className="author__wrap">
				<div className="author__man h2 confirm">
					{userData.firstName ? `${userData.firstName} ` : ""}
					{userData.lastName || ""}
				</div>
				<div className="author__parameters">
					<div className="author__parameter h6">
						{userData.followers
							? `${userData.followers.length} người theo dõi`
							: `${userData.friends.length} bạn bè` || ""}
					</div>
					<div className="author__parameter h6">120 videos</div>
				</div>
			</div>
		</div>
	) : null;
};

export default AuthorDetail;
