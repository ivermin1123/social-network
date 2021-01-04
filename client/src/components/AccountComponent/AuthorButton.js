import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Theme } from "../../constants/index";
import friendRequestActions from "../../actions/friendRequest.actions";

const AuthorButton = ({ ...props }) => {
	const { isSendReq, isFriend, isMySelf, sender, receiver } = props;
	const dispatch = useDispatch();
	const [addFr, setAddFriend] = useState(isSendReq);

	const handleAddFriend = () => {
		if (!isSendReq) {
			dispatch(friendRequestActions.sendRequest({ sender, receiver }));
		} else {
			dispatch(
				friendRequestActions.deleteRequest({
					sender,
					receiver,
				})
			);
		}
		setAddFriend(!addFr);
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
						to="#/"
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
