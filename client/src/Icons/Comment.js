import * as React from "react";

function SvgComment(props) {
	return (
		<svg
			width={12}
			height={12}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M6 0C2.7 0 0 2.325 0 5.25s2.7 5.25 6 5.25c.3 0 .6 0 .825-.075L10.5 12V8.7c.9-.9 1.5-2.1 1.5-3.45C12 2.325 9.3 0 6 0z"
				fill="#1B1D21"
			/>
		</svg>
	);
}

export default SvgComment;
