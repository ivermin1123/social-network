import * as React from "react";

function SvgProfileCheck(props) {
	return (
		<svg
			width={20}
			height={20}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M7.5 10c-2.3 0-4.167-2.7-4.167-5v-.833a4.167 4.167 0 018.334 0V5c0 2.3-1.866 5-4.167 5zM10 16.667c0-1.755.778-3.325 2.005-4.395-1.252-.328-2.807-.605-4.505-.605-2.353 0-4.44.531-5.812.994A2.492 2.492 0 000 15.027v3.306h10.245A5.826 5.826 0 0110 16.667zM14.167 19.512l-2.845-2.845 1.178-1.179 1.667 1.667 4.166-4.167 1.179 1.179-5.345 5.345z"
				fill="#1B1D21"
			/>
		</svg>
	);
}

export default SvgProfileCheck;
