import * as React from "react";

function SvgSearchcopy(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={20}
			height={20}
			{...props}
		>
			<path
				fill="#11142d"
				d="M9.612 0c5.308 0 9.612 4.208 9.612 9.4 0 2.45-.958 4.68-2.53 6.354l3.088 3.01c.29.282.3.74.001 1.024a.753.753 0 01-.964.07l-.083-.07-3.124-3.047a9.706 9.706 0 01-6 2.057C4.303 18.8 0 14.6 0 9.4S4.303 0 9.612 0zm0 1.448c-4.49 0-8.13 3.56-8.13 7.952s3.64 7.952 8.13 7.952 8.13-3.56 8.13-7.952-3.64-7.952-8.13-7.952z"
			/>
		</svg>
	);
}

export default SvgSearchcopy;
