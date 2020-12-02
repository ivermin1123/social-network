import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Theme from "../../constants/Theme";

const LikeButton = () => {
	return (
		<div>
			<FontAwesomeIcon icon={Theme.ICONS.thumbsUp} /> Like
		</div>
	);
};

export default LikeButton;
