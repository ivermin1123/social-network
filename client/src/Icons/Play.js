import * as React from "react";

function SvgPlay(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={12}
			height={16}
			{...props}
		>
			<path
				fill="#fff"
				d="M12 8a1 1 0 00-.427-.819l-10-7A1.001 1.001 0 00.538.112 1 1 0 000 .999v14a1 1 0 00.538.887c.33.17.73.146 1.035-.068l10-7A.995.995 0 0012 8z"
			/>
		</svg>
	);
}

export default SvgPlay;
