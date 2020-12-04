import React from "react";
import Messages from "./Messages";
import SideBar from "./SideBar";
import RightBar from "./Message/RightBar";

const Home = () => {
	return (
		<div id="main-chat">
			<SideBar />
			<Messages />
			<RightBar />
		</div>
	);
};

export default Home;
