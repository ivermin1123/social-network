import * as React from "react";

function SvgShare1(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={17}
			height={14}
			{...props}
		>
			<path
				fill="#11142D"
				d="M8 4.065l-.118.009C3.074 4.435 0 7.214 0 13c0 1.007 1.321 1.383 1.85.525l.158-.245c1.335-2.008 3.217-2.991 5.735-3.225l.257-.02V13a1 1 0 001.65.76l7-6a1 1 0 000-1.52l-7-6A1 1 0 008 1v3.065zm2-.891L14.463 7 10 10.825V9a1 1 0 00-1-1l-.352.004C6.336 8.05 4.354 8.577 2.73 9.7l-.297.214.055-.16C3.428 7.132 5.694 6.033 9 6.033a1 1 0 001-1V3.174z"
			/>
		</svg>
	);
}

export default SvgShare1;
