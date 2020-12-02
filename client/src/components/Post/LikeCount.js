import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Theme from "../../constants/Theme";

const LikeCount = () => {
	return (
		<div>
			<FontAwesomeIcon icon={Theme.ICONS.thumbsUp} color="blue" /> 20 likes
		</div>
	);
};

export default LikeCount;
