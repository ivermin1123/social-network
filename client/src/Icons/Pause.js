import * as React from "react";

function SvgPause(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={14}
			height={14}
			{...props}
		>
			<path
				fill="#fff"
				d="M4 0a.94.94 0 011 1v12a.94.94 0 01-1 1H1a.94.94 0 01-1-1V1a.94.94 0 011-1zm9 0a.94.94 0 011 1v12a.94.94 0 01-1 1h-3a.94.94 0 01-1-1V1a.94.94 0 011-1z"
			/>
		</svg>
	);
}

export default SvgPause;
