import React, { useState } from "react";
import MenuItem from "./MenuItem";

function Menu() {
	const [isActive, setActive] = useState([
		{
			id: 1,
			active: true,
		},
		{
			id: 2,
			active: false,
		},
		{
			id: 3,
			active: false,
		},
		{
			id: 4,
			active: false,
		},
		{
			id: 5,
			active: false,
		},
	]);

	const handleActive = (position) => {
		const newState = isActive.map((item, index) => {
			if (index === position - 1) {
				item.active = true;
			} else {
				item.active = false;
			}
			return item;
		});
		setActive(newState);
	};
	return (
		<div className="sidebar__group">
			<div className="sidebar__caption caption-sm">
				<span>New </span>Feeds
			</div>
			<div className="sidebar__menu">
				<MenuItem
					icon="icon-game-play"
					name="News Feed"
					info={isActive[0]}
					handleActive={handleActive}
				/>
				<MenuItem
					icon="icon-trending"
					name="Trending"
					info={isActive[1]}
					handleActive={handleActive}
				/>
				<MenuItem
					icon="icon-profile"
					name="Following"
					info={isActive[2]}
					handleActive={handleActive}
				/>
				<MenuItem
					icon="icon-camera"
					name="Your Videos"
					hasAdd="true"
					info={isActive[3]}
					handleActive={handleActive}
				/>
				<MenuItem
					icon="icon-document"
					name="Playlist"
					info={isActive[4]}
					handleActive={handleActive}
				/>
			</div>
		</div>
	);
}

export default Menu;
