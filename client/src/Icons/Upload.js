import * as React from "react";

function SvgUpload(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={17}
			height={17}
			{...props}
		>
			<path
				fill="#fff"
				d="M5.876 6.047v2H3.76l-.75 6h11.734l-.75-6h-2.117v-2h3a1 1 0 01.992.876l1 8a1 1 0 01-.243.786.999.999 0 01-.75.338h-14a1 1 0 01-.993-1.124l1-8a1 1 0 01.993-.876h3zm3-6l4 4h-3v7h-2v-7h-3l4-4z"
			/>
		</svg>
	);
}

export default SvgUpload;
