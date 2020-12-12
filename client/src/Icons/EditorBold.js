import * as React from "react";

function SvgEditorBold(props) {
	return (
		<svg
			width={10}
			height={12}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M7.67 5.487a2.612 2.612 0 001.064-2.405C8.586 1.729 7.357.75 5.997.75H.5v.75l1.085.543a.75.75 0 01.415.67v6.573a.75.75 0 01-.415.671L.5 10.5v.75h5.867c1.578 0 2.985-1.16 3.121-2.733a3 3 0 00-1.817-3.03zM4.25 2.25H5a1.5 1.5 0 110 3h-.75v-3zm0 4.5v3h1.5a1.5 1.5 0 000-3h-1.5z"
				fill="#fff"
			/>
		</svg>
	);
}

export default SvgEditorBold;
