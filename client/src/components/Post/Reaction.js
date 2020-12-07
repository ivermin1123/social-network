import React from "react";
import "../../assets/styles/_reactionBox.scss";
import { Like, Love, Haha, Wow, Sad, Angry } from "../../Icons/_icon";

const Reaction = () => {
	return (
		<>
			<div className="reaction-box">
				<Like className="reaction-icon like" />
				<Love className="reaction-icon love" />
				<Haha className="reaction-icon haha" />
				<Wow className="reaction-icon wow" />
				<Sad className="reaction-icon sad" />
				<Angry className="reaction-icon angry" />
			</div>
		</>
	);
};

export default Reaction;
