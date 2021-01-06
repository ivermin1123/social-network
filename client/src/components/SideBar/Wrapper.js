import React from "react";
// import Menu from "./Menu";
import Chat from "./Chat";
import Unity from "./Unity";
import Banner from "./Banner";

import bannerImg from "../../assets/image/sidebar-banner.png";

function Wrapper() {
	return (
		<div className="sidebar__wrapper">
			<div className="sidebar__inner">
				{/* <Menu /> */}
				<Chat />
				<Unity />
			</div>
			<Banner icon="icon-remove" image={bannerImg} />
		</div>
	);
}

export default Wrapper;
