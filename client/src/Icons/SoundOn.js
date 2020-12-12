import * as React from "react";

function SvgSoundOn(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={16}
			height={16}
			{...props}
		>
			<path
				fill="#fff"
				d="M12.8 12.2c-.4-.4-.4-1 0-1.4a3.98 3.98 0 000-5.7c-.4-.4-.4-1 0-1.4s1-.4 1.4 0c2.3 2.3 2.3 6.1 0 8.5-.3.4-1 .4-1.4 0zM11 1A1 1 0 009.4.2L3.7 4H1a.94.94 0 00-1 1v6a.94.94 0 001 1h2.7l5.7 3.8c.7.4 1.6 0 1.6-.8V1z"
			/>
		</svg>
	);
}

export default SvgSoundOn;
