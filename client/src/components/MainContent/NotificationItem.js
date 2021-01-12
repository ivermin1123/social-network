import React from "react";
import moment from "moment";
import { Avatar } from "antd";

import { LINK } from "../../constants";
import avatar1 from "../../assets/image/ava-1.png";
import imgChat from "../../assets/icons/chat.svg";

function NotificationItem(props) {
	const { notify } = props;
	const { notifyBy } = notify;
	const avatar = notifyBy.length ? notifyBy[0].avatar[0].path : avatar1;

	return (
		<a className="notifications__item" href="#/">
			<div className="notifications__ava">
				<Avatar
					size={48}
					className="notifications__pic"
					src={`${LINK.LINK_S3}${avatar}`}
					alt=""
				/>
				<div className="notifications__status bg-blue">
					<img className="notifications__pic" src={imgChat} alt="" />
				</div>
			</div>
			<div className="notifications__details">
				<div className="notifications__line">
					<div className="notifications__user">
						{notifyBy[0].firstName} {notifyBy[0].lastName}
					</div>
					<div className="notifications__time">
						{moment(notify.createdAt).locale("vi").fromNow()}
					</div>
				</div>
				<div className="notifications__text">
					Thông báo
					{/* {mention ? (
						<span className="notifications__project">
							{mention}
						</span>
					) : null} */}
				</div>
			</div>
		</a>
	);
}

export default NotificationItem;
