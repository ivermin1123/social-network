import * as React from "react";

function SvgViewCell(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={17}
			height={17}
			{...props}
		>
			<path
				fill="#fff"
				d="M2.5 16.5a2 2 0 01-2-2v-12a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2zm0-2h5v-5h-5v5zm12-5h-5v5h5v-5zm0-2v-5h-5v5h5zm-7-5h-5v5h5v-5z"
			/>
		</svg>
	);
}

export default SvgViewCell;
