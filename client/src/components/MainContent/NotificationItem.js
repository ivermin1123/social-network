import React from "react";
import avatar1 from "../../assets/image/ava-1.png";
import imgChat from "../../assets/icons/chat.svg";

function NotificationItem(props) {
	const { avatar, name, time, content, mention } = props;
	return (
		<a className="notifications__item" href="#/">
			<div className="notifications__ava">
				<img
					className="notifications__pic"
					src={avatar || avatar1}
					alt=""
				/>
				<div className="notifications__status bg-blue">
					<img className="notifications__pic" src={imgChat} alt="" />
				</div>
			</div>
			<div className="notifications__details">
				<div className="notifications__line">
					<div className="notifications__user">{name}</div>
					<div className="notifications__time">{time}</div>
				</div>
				<div className="notifications__text">
					{content}{" "}
					{mention ? (
						<span className="notifications__project">
							{mention}
						</span>
					) : null}
				</div>
			</div>
		</a>
	);
}

export default NotificationItem;
