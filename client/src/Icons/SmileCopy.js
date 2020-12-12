import * as React from "react";

function SvgSmilecopy(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={16}
			height={16}
			{...props}
		>
			<path
				fill="#fff"
				d="M8 0a8 8 0 110 16A8 8 0 118 0zm0 1a7 7 0 100 14A7 7 0 108 1zm4.41 7.5l.09.012a.5.5 0 01.377.598 5 5 0 01-9.751 0 .5.5 0 11.975-.222 4 4 0 007.801 0 .5.5 0 01.421-.385l.088-.004zM5 4a2 2 0 012 2 .5.5 0 11-1 0 1 1 0 10-2 0 .5.5 0 11-1 0 2 2 0 012-2zm7 .268A2 2 0 0113 6a.5.5 0 11-1 0 1 1 0 00-1.5-.866A1 1 0 0010 6a.5.5 0 11-1 0 2 2 0 013-1.732z"
			/>
		</svg>
	);
}

export default SvgSmilecopy;
