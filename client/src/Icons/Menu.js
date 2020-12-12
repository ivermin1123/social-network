import * as React from "react";

function SvgMenu(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={16}
			height={4}
			{...props}
		>
			<path
				fill="#fff"
				d="M8 0a2 2 0 110 4 2 2 0 110-4zm6 0a2 2 0 110 4 2 2 0 110-4zM2 0a2 2 0 110 4 2 2 0 110-4zm6 1a1 1 0 100 2 1 1 0 100-2zm6 0a1 1 0 100 2 1 1 0 100-2zM2 1a1 1 0 100 2 1 1 0 100-2z"
			/>
		</svg>
	);
}

export default SvgMenu;
