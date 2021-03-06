import * as React from "react";

function SvgPlayWindow(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={16}
			height={13}
			{...props}
		>
			<path
				fill="#fff"
				d="M14 11v2H2v-2h12zm2-11v10H0V0h16zM7 3v4l3-2-3-2z"
			/>
		</svg>
	);
}

export default SvgPlayWindow;
