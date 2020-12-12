import * as React from "react";

function SvgMessage(props) {
	return (
		<svg
			width={9}
			height={8}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M6.778.25a2.107 2.107 0 012.109 2.104v3.292a2.107 2.107 0 01-2.11 2.104H2.663A2.107 2.107 0 01.553 5.646V2.354C.553 1.192 1.494.25 2.662.25h4.116zm.663 2.725l.033-.033c.1-.121.1-.296-.005-.417a.35.35 0 00-.22-.108.317.317 0 00-.234.083L5.137 4c-.242.2-.588.2-.834 0L2.428 2.5a.318.318 0 00-.446.446L2.037 3l1.895 1.48a1.31 1.31 0 001.63 0L7.44 2.974z"
				fill="#fff"
			/>
		</svg>
	);
}

export default SvgMessage;
