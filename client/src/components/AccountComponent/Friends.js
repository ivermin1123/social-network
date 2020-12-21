import React from "react";
import ava from "../../assets/image/ava-1.png";
import LINK_CONSTANT from "../../constants/link.constants";

const Friends = ({ ...props }) => {
	const { display, userData } = props;
	return userData ? (
		<div style={{ display: display || "none" }} className="friend">
			<div className="friend-item">
				{userData.friends &&
					userData.friends.map((item) => {
						return (
							<a
								key={item._id}
								className="friend-item-row"
								href={`/account/${item._id}`}
							>
								<div className="friend-item-row__avatar">
									{item.avatar && item.avatar.length ? (
										<img
											className="ava__pic"
											src={`${LINK_CONSTANT.LINK_S3}${item.avatar[0].path}`}
											alt=""
										/>
									) : (
										<img
											className="ava__pic"
											src={ava}
											alt=""
										/>
									)}
								</div>
								<div className="friend-item-row__info">
									<div className="friend-item-row__info-name">
										{item.firstName} {item.lastName}
									</div>
								</div>
							</a>
						);
					})}
			</div>
		</div>
	) : null;
};

export default Friends;
