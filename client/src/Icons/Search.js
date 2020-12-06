import * as React from "react";

function SvgSearch(props) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
			<path
				d="M31.4 28.6l-7.9-7.9c1.6-2.1 2.5-4.8 2.5-7.7 0-7.2-5.8-13-13-13S0 5.8 0 13s5.8 13 13 13c2.9 0 5.5-.9 7.7-2.5l7.9 7.9c.8.8 2 .8 2.8 0s.8-2 0-2.8zM4 13c0-5 4-9 9-9s9 4 9 9-4 9-9 9-9-4-9-9z"
				fill="#ccc"
			/>
		</svg>
	);
}

export default SvgSearch;
