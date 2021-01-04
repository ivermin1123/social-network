import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";

import friendRequestActions from "../../actions/friendRequest.actions";
import { LINK } from "../../constants";
// import img from "../../assets/image/sontungMTP.jpg";

function FriendRequestItem(props) {
	const { index, data, setActive, active } = props;
	const dispatch = useDispatch();
	const { receiver, sender, createdAt } = data;

	const thisUser = Array.isArray(sender) ? sender[0] : receiver[0];
	const handleAccept = () => {
		dispatch(
			friendRequestActions.acceptRequest({
				sender: Array.isArray(sender) ? sender[0]._id : sender,
				receiver: Array.isArray(receiver) ? receiver[0]._id : receiver,
				requestId: data._id,
			})
		);
		setActive(active);
	};
	const handleDelete = () => {
		dispatch(
			friendRequestActions.deleteRequest({
				sender: Array.isArray(sender) ? sender[0]._id : sender,
				receiver: Array.isArray(receiver) ? receiver[0]._id : receiver,
			})
		);
		setActive(active);
	};
	return (
		<div className="card">
			<div className="card__inner">
				<div
					className="card__bg"
					style={{
						backgroundImage: `url(${LINK.LINK_S3}${thisUser.avatar[0].path})`,
					}}
				>
					<div className="card__number">{index}</div>
				</div>
				<div className="card__details">
					<div className="card__head">
						{Array.isArray(sender) && (
							<div
								className="card__category"
								onClick={handleAccept}
							>
								Xác nhận
							</div>
						)}

						<div className="card__category" onClick={handleDelete}>
							Xóa
						</div>
					</div>
					<div className="card__title h6">
						{thisUser.firstName} {thisUser.lastName}
					</div>
					<div className="card__status">
						<div className="status blue">
							Lời mời được gửi vào{" "}
							{moment(createdAt).locale("vi").fromNow()}
						</div>
						{/* <div className="status green">
							Lời mời được gửi vào 1 ngày trước
						</div> */}
					</div>
					{/* <div className="card__user">
						<div className="card__ava">
							<img
								className="card__pic"
								src="img/ava-1.png"
								alt=""
							/>
						</div>
						<div className="card__desc">
							<div className="card__man confirm">
								Gabriel Erickson{" "}
							</div>
							<div className="card__game">Call of Duty</div>
						</div>
					</div> */}
				</div>
			</div>
		</div>
	);
}

export default FriendRequestItem;
