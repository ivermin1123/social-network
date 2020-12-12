import * as React from "react";

function SvgPlusSm(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={12}
			height={13}
			{...props}
		>
			<path
				fill="#11142d"
				d="M6 .857a1 1 0 01.993.883L7 1.857v4h4a1 1 0 01.117 1.993L11 7.857H7v4a1 1 0 01-1.993.117L5 11.857v-4H1a1 1 0 01-.117-1.993L1 5.857h4v-4a1 1 0 011-1z"
			/>
		</svg>
	);
}

export default SvgPlusSm;
