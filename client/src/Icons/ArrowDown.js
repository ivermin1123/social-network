import * as React from "react";

function SvgArrowDown(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={10}
			height={6}
			{...props}
		>
			<path
				fill="#11142D"
				d="M9.707.293a1 1 0 01.083 1.32l-.083.094-4 4a1 1 0 01-1.32.083l-.094-.083-4-4A1 1 0 011.613.21l.094.083L5 3.584 8.293.293A1 1 0 019.613.21l.094.083z"
			/>
		</svg>
	);
}

export default SvgArrowDown;
