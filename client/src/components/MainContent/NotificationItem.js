import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar } from "antd";

import notifyActions from "../../actions/notify.actions";
import { LINK } from "../../constants";
import avatar1 from "../../assets/image/ava-1.png";
import imgChat from "../../assets/icons/chat.svg";

/**
 * Post
 * 1: Like Post
 * 2: Comment on Post
 * Comment
 * 3: Like comment
 * 4: Reply comment
 * Friend Request
 * 5: New friend request
 * 6: Accept friend request
 * Message
 */
function getTextNotify(type) {
	let text = "";
	switch (type) {
		case 1:
			text = "đã bày tỏ cảm xúc về bài viết của bạn.";
			break;
		case 2:
			text = "đã bình luận về bài viết của bạn.";
			break;
		case 3:
			text = "đã bày tỏ cảm xúc về bình luận của bạn.";
			break;
		case 4:
			text = "đã trả lời bình luận của bạn.";
			break;
		case 5:
			text = "đã bày tỏ cảm xúc về bài viết của bạn.";
			break;
		case 6:
			text = "đã bày tỏ cảm xúc về bài viết của bạn.";
			break;
		default:
			break;
	}
	return text;
}

function NotificationItem(props) {
	const { notify } = props;
	const dispatch = useDispatch();

	const { notifyBy, post } = notify;
	const avatar = notifyBy.length ? notifyBy[0].avatar[0].path : avatar1;

	const handleSeen = () => {
		dispatch(notifyActions.seenNotify({ notifyId: notify._id }));
	};
	return (
		<Link
			className="notifications__item"
			to={`/post/${post[0]._id}`}
			onClick={handleSeen}
		>
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
					{getTextNotify(notify.type)}
					{/* {mention ? (
						<span className="notifications__project">
							{mention}
						</span>
					) : null} */}
				</div>
			</div>
		</Link>
	);
}

export default NotificationItem;
