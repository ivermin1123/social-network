import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const LikeCount = () => {
  return (
    <div>
      <FontAwesomeIcon icon={faThumbsUp} color="blue" /> 20 likes
    </div>
  );
};

export default LikeCount;
