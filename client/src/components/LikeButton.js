import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";

const LikeButton = () => {
	return (
		<div>
			<FontAwesomeIcon icon={faThumbsUp} /> Like
		</div>
	);
};

export default LikeButton;
