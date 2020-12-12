import * as React from "react";

function SvgRemove(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={10}
			height={10}
			{...props}
		>
			<path
				fill="#11142D"
				d="M1.613.21l.094.083L5 3.585 8.293.293a1 1 0 011.497 1.32l-.083.094L6.415 5l3.292 3.293a1 1 0 01-1.32 1.497l-.094-.083L5 6.415 1.707 9.707A1 1 0 01.21 8.387l.083-.094L3.585 5 .293 1.707A1 1 0 011.613.21z"
			/>
		</svg>
	);
}

export default SvgRemove;
