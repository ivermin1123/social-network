import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Theme } from "../../constants/index";
import Reaction from "./Reaction";

const LikeButton = () => {
	const [showReaction, setShowReaction] = useState(false);
	return (
		<>
			<div
				onMouseEnter={() => setShowReaction(true)}
				onMouseLeave={() => setShowReaction(false)}
			>
				<FontAwesomeIcon icon={Theme.ICONS.thumbsUp} /> Like
			</div>

			{showReaction && <Reaction />}
		</>
	);
};

export default LikeButton;
