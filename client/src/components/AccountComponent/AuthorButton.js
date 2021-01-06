import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Modal, notification } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Theme } from "../../constants/index";
import friendRequestActions from "../../actions/friendRequest.actions";

const AuthorButton = ({ ...props }) => {
	const {
		isSendReq,
		isFriend,
		isMySelf,
		sender,
		receiver,
		setIsFriend,
	} = props;
	const dispatch = useDispatch();
	const [addFr, setAddFriend] = useState(isSendReq);

	const unfriend = () => {
		dispatch(friendRequestActions.unfriend({ friend: receiver })).then(
			() => {
				setIsFriend(false);
				notification.success({
					message: "Thông báo",
					description: "Hủy kết bạn thành công.",
				});
			}
		);
	};

	const confirm = () => {
		Modal.confirm({
			getContainer: false,
			title: "Confirm",
			icon: <ExclamationCircleOutlined />,
			content: "Bạn có chắc muốn hủy bạn bè với người này?",
			okText: "OK",
			cancelText: "Cancel",
			onOk: unfriend,
		});
	};

	const handleAddFriend = () => {
		if (!isFriend) {
			if (!isSendReq) {
				dispatch(
					friendRequestActions.sendRequest({ sender, receiver })
				);
			} else {
				dispatch(
					friendRequestActions.deleteRequest({
						sender,
						receiver,
					})
				);
			}
			setAddFriend(!addFr);
		} else {
			confirm();
		}
	};

	return (
		<div className="author__btns">
			{isMySelf ? (
				<button type="button" className="author__btn btn btn_purple">
					Chỉnh sửa trang cá nhân
				</button>
			) : (
				<div>
					<Link
						to={`/message/${receiver}`}
						type="button"
						className="author__btn btn btn_purple"
					>
						Message
					</Link>
					<button
						type="button"
						className="author__btn btn btn_asphalt btn_square"
						onClick={handleAddFriend}
					>
						{isFriend ? (
							<FontAwesomeIcon
								className="icon"
								icon={Theme.ICONS.faUserCheck}
							/>
						) : (
							<FontAwesomeIcon
								className="icon"
								icon={
									addFr
										? Theme.ICONS.faUserTimes
										: Theme.ICONS.faUserPlus
								}
							/>
						)}
					</button>
					)
				</div>
			)}
		</div>
	);
};

export default AuthorButton;
