import * as React from "react";

function SvgHeart(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={17}
			height={15}
			{...props}
		>
			<path
				fill="#fff"
				d="M1.464 1.464a5 5 0 000 7.071l6.338 6.18a1 1 0 001.396 0l6.328-6.172a5 5 0 00.009-7.079l-.18-.172a5 5 0 00-6.709 0L8.5 1.43l.034.032a5 5 0 00-7.07.001zM7.12 2.88c.182.18.34.404.5.7a1 1 0 001.757 0c.16-.295.318-.518.5-.7a3 3 0 014.243 0l.135.144a3 3 0 01-.135 4.098L8.5 12.603l-5.63-5.5a3 3 0 014.252-4.234z"
			/>
		</svg>
	);
}

export default SvgHeart;
