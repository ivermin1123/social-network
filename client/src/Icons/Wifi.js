import * as React from "react";

function SvgWifi(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={16}
			height={11}
			{...props}
		>
			<path
				fill="#fff"
				d="M7.717 7a2 2 0 110 4 2 2 0 110-4zm4.593-1.658a1 1 0 01-1.414 1.415 4.5 4.5 0 00-6.361 0 1 1 0 11-1.414-1.415 6.5 6.5 0 019.189 0zm2.83-2.145a1 1 0 11-1.414 1.414 8.5 8.5 0 00-12.019 0A1 1 0 11.292 3.197c4.1-4.1 10.747-4.1 14.847 0z"
			/>
		</svg>
	);
}

export default SvgWifi;
