import React from "react";

const Introduction = ({ ...props }) => {
	const { display } = props;
	return <div style={{ display: display || "none" }}>Intro</div>;
};

export default Introduction;
