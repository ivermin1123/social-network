import React from "react";

const Friends = ({ ...props }) => {
	const { display } = props;
	return <div style={{ display: display || "none" }}>FRIends</div>;
};

export default Friends;
