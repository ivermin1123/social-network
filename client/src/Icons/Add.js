import * as React from "react";

function SvgAdd(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={22}
			height={22}
			{...props}
		>
			<path
				fill="#808191"
				d="M11 0c6.075 0 11 4.925 11 11s-4.925 11-11 11S0 17.075 0 11 4.925 0 11 0zm0 2a9 9 0 100 18 9 9 0 000-18zm0 3a1 1 0 01.993.883L12 6v4h4a1 1 0 01.117 1.993L16 12h-4v4a1 1 0 01-1.993.117L10 16v-4H6a1 1 0 01-.117-1.993L6 10h4V6a1 1 0 011-1z"
			/>
		</svg>
	);
}

export default SvgAdd;
