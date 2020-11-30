import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt } from "@fortawesome/free-regular-svg-icons";

const CommentButton = () => {
  return (
    <div>
      <FontAwesomeIcon icon={faCommentAlt} /> Comment
    </div>
  );
};

export default CommentButton;
