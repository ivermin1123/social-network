import * as React from "react";

function SvgFullScreen(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={16}
			height={16}
			{...props}
		>
			<path
				fill="#fff"
				d="M16 10v5a.94.94 0 01-1 1h-5v-2h4v-4h2zM2 10v4h4v2H1a.94.94 0 01-1-1v-5h2zM6 0v2H2v4H0V1a.94.94 0 011-1h5zm9 0a.94.94 0 011 1v5h-2V2h-4V0h5z"
			/>
		</svg>
	);
}

export default SvgFullScreen;
