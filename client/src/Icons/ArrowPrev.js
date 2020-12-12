import * as React from "react";

function SvgArrowPrev(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={6}
			height={10}
			{...props}
		>
			<path
				fill="#FFF"
				d="M5.707 9.707a1 1 0 01-1.32.083l-.094-.083-4-4a1 1 0 01-.083-1.32l.083-.094 4-4a1 1 0 011.497 1.32l-.083.094L2.416 5l3.291 3.293a1 1 0 01.083 1.32l-.083.094z"
			/>
		</svg>
	);
}

export default SvgArrowPrev;
