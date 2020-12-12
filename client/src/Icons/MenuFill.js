import * as React from "react";

function SvgMenuFill(props) {
	return (
		<svg
			width={13}
			height={4}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<circle cx={6.882} cy={2} r={1.5} fill="#808191" />
			<circle cx={2.382} cy={2} r={1.5} fill="#808191" />
			<circle cx={11.382} cy={2} r={1.5} fill="#808191" />
		</svg>
	);
}

export default SvgMenuFill;
