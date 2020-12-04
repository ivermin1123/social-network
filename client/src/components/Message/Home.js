import React from "react";
import Messages from "./Messages";
import SideBar from "./SideBar";

const Home = () => {
	return (
		<div id="main-chat">
			<SideBar />
			<Messages />
		</div>
	);
};

export default Home;
