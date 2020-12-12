import * as React from "react";

function SvgArrowNext(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={6}
			height={10}
			{...props}
		>
			<path
				fill="#FFF"
				d="M.293.293A1 1 0 011.613.21l.094.083 4 4a1 1 0 01.083 1.32l-.083.094-4 4A1 1 0 01.21 8.387l.083-.094L3.584 5 .293 1.707A1 1 0 01.21.387L.293.293z"
			/>
		</svg>
	);
}

export default SvgArrowNext;
