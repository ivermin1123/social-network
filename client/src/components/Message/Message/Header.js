import React from "react";
import { useSelector, connect } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";

import Logo from "../../../Icons/Logo";
import Settings from "../../../Icons/Settings";
import img5 from "../../../assets/image/avatar-5.png";

function Header(props) {
	const { user } = useSelector((state) => state.authentication.user);
	const { conversationOpen, conversations, loadingConversation } = props;

	if (loadingConversation) {
		return <LoadingOutlined />;
	}
	const conversation = conversations.data.filter(
		(conversation) => conversation._id === conversationOpen
	);
	console.log("conversation 😢", conversation);

	let conversationName;
	if (conversation[0].members.length <= 2) {
		const memberFilter = conversation[0].members.filter(
			(member) => member._id !== user._id
		);

		conversationName = `${memberFilter[0].firstName} ${memberFilter[0].lastName}`;
	}

	return (
		<div className="col-header">
			<div className="container">
				<div className="left">
					<Logo />
				</div>

				<div className="middle">
					<h4>{conversationName}</h4>
					<p>Messenger</p>
				</div>

				<div className="right">
					<div className="username">
						<div className="settings">
							<Settings />
						</div>
						{`${user.firstName} ${user.lastName}`}
					</div>

					<div className="avatar">
						<img alt="avatar" src={img5} />
					</div>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	conversationOpen: state.conversations.conversationOpen,
	conversations: state.conversations.conversations,
	loadingConversation: state.conversations.loadingConversation,
});

export default connect(mapStateToProps)(Header);
