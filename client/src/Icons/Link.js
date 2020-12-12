import * as React from "react";

function SvgLink(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={24}
			height={12}
			{...props}
		>
			<path
				fill="#808191"
				d="M21 0a3 3 0 012.995 2.824L24 3v6a3 3 0 01-2.824 2.995L21 12h-6a1 1 0 01-.117-1.993L15 10h6a1 1 0 00.993-.883L22 9V7H8a1 1 0 01-.117-1.993L8 5h14V3a1 1 0 00-.883-.993L21 2h-6a1 1 0 01-.117-1.993L15 0h6zM9 0a1 1 0 011 1 1 1 0 01-.883.993L9 2H3a1 1 0 00-.993.883L2 3v6a1 1 0 00.883.993L3 10h6a1 1 0 01.117 1.993L9 12H3A3 3 0 01.005 9.176L0 9V3A3 3 0 012.824.005L3 0h6z"
			/>
		</svg>
	);
}

export default SvgLink;
