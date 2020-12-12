import * as React from "react";

function SvgClose(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={13}
			height={13}
			{...props}
		>
			<path
				fill="#1B1D21"
				fillRule="evenodd"
				d="M12.48 2.08a.75.75 0 10-1.06-1.06L6.822 5.616 2.227 1.02a.75.75 0 00-1.06 1.06l4.596 4.597-4.597 4.596a.75.75 0 101.061 1.06l4.596-4.596 4.596 4.597a.75.75 0 001.061-1.061L7.884 6.677 12.48 2.08z"
			/>
		</svg>
	);
}

export default SvgClose;
