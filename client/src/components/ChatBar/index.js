import React, { useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";

import userActions from "../../actions/user.actions";
import img5 from "../../assets/image/avatar-5.png";
import "./ChatBar.scss";
// import img2 from "../../assets/image/avatar-2.png";
// import img3 from "../../assets/image/avatar-3.png";
// import img4 from "../../assets/image/avatar-4.png";

function ChatBar(props) {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.authentication.user);
	useEffect(() => {
		dispatch(userActions.getUser(user._id));
	}, []);
	const { openChat, infoUser, loadingUser } = props;

	if (loadingUser) {
		return <LoadingOutlined />;
	}
	const { friends } = infoUser.data;

	return (
		<div className="chatBar">
			<div className="chatBar__title">
				<span>Người liên hệ</span>
			</div>
			{friends &&
				friends.map((user) => (
					<div
						role="button"
						tabIndex={0}
						className="chatBar__list"
						key={user._id}
						onClick={() => openChat(user)}
						onKeyDown={() => openChat(user)}
					>
						<div className="chatBar__list-img">
							<img src={user.avatar || img5} alt="user" />
							<span className="status" />
						</div>
						<div className="chatBar__list-name">{`${user.firstName} ${user.lastName}`}</div>
					</div>
				))}
		</div>
	);
}

const mapStateToProps = (state) => ({
	infoUser: state.users.infoUser,
	loadingUser: state.users.loadingUser,
});

export default connect(mapStateToProps)(ChatBar);
