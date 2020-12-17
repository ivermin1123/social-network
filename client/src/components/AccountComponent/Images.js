import React from "react";

const Images = ({ ...props }) => {
	const { display } = props;
	return (
		<div style={{ display: display || "none" }}>
			<div>Images here</div>
		</div>
	);
};

export default Images;
