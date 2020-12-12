import * as React from "react";

function SvgDotsBorder(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={24}
			height={6}
			{...props}
		>
			<path
				fill="#11142D"
				d="M12 0a3 3 0 110 6 3 3 0 010-6zM3 0a3 3 0 110 6 3 3 0 010-6zm18 0a3 3 0 110 6 3 3 0 010-6zm-9 2a1 1 0 100 2 1 1 0 000-2zM3 2a1 1 0 100 2 1 1 0 000-2zm18 0a1 1 0 100 2 1 1 0 000-2z"
			/>
		</svg>
	);
}

export default SvgDotsBorder;
