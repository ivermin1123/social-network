import * as React from "react";

function SvgPluscopy(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={22}
			height={22}
			{...props}
		>
			<path
				fill="#FFF"
				d="M11 0a1 1 0 01.993.883L12 1v9h9a1 1 0 01.117 1.993L21 12h-9v9a1 1 0 01-1.993.117L10 21v-9H1a1 1 0 01-.117-1.993L1 10h9V1a1 1 0 011-1z"
			/>
		</svg>
	);
}

export default SvgPluscopy;
