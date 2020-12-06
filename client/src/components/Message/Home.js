import React from "react";
import Messages from "./Messages";
import NotFound from "./NotFound";
import SideBar from "./SideBar";
import RightBar from "./Message/RightBar";

const Home = () => {
	const messages = true;
	return (
		<div id="main-chat">
			{messages ? (
				<>
					<SideBar /> <Messages /> <RightBar />
				</>
			) : (
				<NotFound />
			)}
		</div>
	);
};

export default Home;
