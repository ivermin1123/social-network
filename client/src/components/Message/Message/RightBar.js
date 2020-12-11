import React from "react";
import { useSelector, connect } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";

import img3 from "../../../assets/image/avatar-5.png";

function RightBar(props) {
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
		<div className="col-right">
			<div className="col-content">
				<div className="user-panel">
					<div className="avatar">
						<div className="avatar-image">
							<div className="status online" />
							<img alt="avatar" src={img3} />
						</div>

						<h3>{conversationName}</h3>
					</div>
				</div>
			</div>
			{/* <div className="member-panel">
			</div> */}
		</div>
	);
}

const mapStateToProps = (state) => ({
	conversationOpen: state.conversations.conversationOpen,
	conversations: state.conversations.conversations,
	loadingConversation: state.conversations.loadingConversation,
});

export default connect(mapStateToProps)(RightBar);
