import * as React from "react";

function SvgArrows(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={10}
			height={16}
			{...props}
		>
			<path
				fill="#11142d"
				d="M1.613 10.2l.094.083L5 13.585l3.293-3.292a1 1 0 011.32-.083l.094.083a1 1 0 01.083 1.32l-.083.094-4 4a1 1 0 01-1.32.083l-.094-.083-4-4a1 1 0 011.32-1.497zm4-10l.094.083 4 4a1 1 0 01-1.32 1.497l-.094-.083L5 2.416l-3.293 3.29a1 1 0 01-1.32.083l-.094-.083a1 1 0 01-.083-1.32l.083-.094 4-4A1 1 0 015.613.21z"
			/>
		</svg>
	);
}

export default SvgArrows;
