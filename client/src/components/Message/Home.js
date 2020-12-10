import React from "react";
import Messages from "./Messages";
import NotFound from "./NotFound";
import SideBar from "./SideBar";
import RightBar from "./Message/RightBar";

const Home = (props) => {
	const messages = true;
	const { conversationId } = props;
	return (
		<div id="main-chat">
			{messages ? (
				<>
					<SideBar /> <Messages conversationId={conversationId} />
					<RightBar />
				</>
			) : (
				<NotFound />
			)}
		</div>
	);
};

export default Home;
