import * as React from "react";

function SvgFolder(props) {
	return (
		<svg
			width={8}
			height={8}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M4.483 1.627h1.024c1.23 0 1.83.656 1.826 2.003v1.623c0 1.287-.793 2.08-2.083 2.08H2.747c-1.284 0-2.08-.793-2.08-2.083V2.747c0-1.38.613-2.08 1.823-2.08h.527c.31-.004.6.14.79.383l.293.39a.492.492 0 00.383.187zm-2.026 3.47h3.086a.249.249 0 00.247-.25c0-.14-.11-.25-.247-.25H2.457c-.14 0-.25.11-.25.25 0 .136.11.25.25.25z"
				fill="#fff"
			/>
		</svg>
	);
}

export default SvgFolder;
