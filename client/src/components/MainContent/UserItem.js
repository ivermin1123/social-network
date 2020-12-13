import React from "react";

import avatar1 from "../../assets/image/ava-6.png";

function UserItem(props) {
	const { name, time, href, avatar } = props;
	return (
		<a className="users__item" href={href || "#/"}>
			<div className="ava ava_online">
				<img className="ava__pic" src={avatar || avatar1} alt="" />
			</div>
			<div className="users__title">{name} </div>
			{time ? <div className="users__time">{time}</div> : null}
		</a>
	);
}

export default UserItem;
