import * as React from "react";

function SvgSoundOff(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={14}
			height={16}
			{...props}
		>
			<path
				fill="#fff"
				d="M12.4.2L6.7 4H1a.94.94 0 00-1 1v6a.94.94 0 001 1h5.7l5.7 3.8c.7.4 1.6 0 1.6-.8V1a1 1 0 00-1.6-.8z"
			/>
		</svg>
	);
}

export default SvgSoundOff;
