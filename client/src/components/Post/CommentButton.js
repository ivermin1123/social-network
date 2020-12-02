import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Theme from "../../constants/Theme";

const CommentButton = () => {
	return (
		<div>
			<FontAwesomeIcon icon={Theme.ICONS.commentAlt} /> Comment
		</div>
	);
};

export default CommentButton;
