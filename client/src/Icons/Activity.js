import * as React from "react";

function SvgActivity(props) {
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
				d="M5.727 1.47a.804.804 0 111.607 0 .804.804 0 01-1.607 0zM4.443 4.92l.964-1.243-.014.006a.25.25 0 00-.176-.396.256.256 0 00-.234.103l-.806 1.043-.924-.726a.263.263 0 00-.19-.054.258.258 0 00-.166.1L1.91 5.037l-.02.03a.25.25 0 00.07.316.28.28 0 00.153.05.236.236 0 00.197-.1l.837-1.077.95.714.03.02a.25.25 0 00.316-.07zm.707-3.66a1.58 1.58 0 00-.02.25 1.355 1.355 0 001.6 1.333v2.69c0 1.13-.667 1.8-1.8 1.8H2.467c-1.134 0-1.8-.67-1.8-1.8V3.067c0-1.134.666-1.807 1.8-1.807H5.15z"
				fill="#fff"
			/>
		</svg>
	);
}

export default SvgActivity;
