import * as React from "react";

function SvgMenuVertical(props) {
	return (
		<svg
			width={4}
			height={16}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<circle
				cx={2}
				cy={8}
				r={2}
				transform="rotate(90 2 8)"
				fill="#808191"
			/>
			<circle
				cx={2}
				cy={2}
				r={2}
				transform="rotate(90 2 2)"
				fill="#808191"
			/>
			<circle
				cx={2}
				cy={14}
				r={2}
				transform="rotate(90 2 14)"
				fill="#808191"
			/>
		</svg>
	);
}

export default SvgMenuVertical;
