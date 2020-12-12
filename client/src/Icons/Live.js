import * as React from "react";

function SvgLive(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={16}
			height={11}
			{...props}
		>
			<path
				fill="#FFF"
				d="M7.716 7a2 2 0 110 4 2 2 0 010-4zm4.593-1.658a1 1 0 01-1.413 1.415 4.5 4.5 0 00-6.362 0 1 1 0 01-1.413-1.415 6.5 6.5 0 019.188 0zm2.83-2.145a1 1 0 01-1.414 1.415 8.5 8.5 0 00-12.02 0A1 1 0 11.293 3.197c4.1-4.099 10.746-4.099 14.847 0z"
			/>
		</svg>
	);
}

export default SvgLive;
