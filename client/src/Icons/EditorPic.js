import * as React from "react";

function SvgEditorPic(props) {
	return (
		<svg
			width={14}
			height={13}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M1.75 3h10.5a.709.709 0 01.75.75v7.5a.708.708 0 01-.75.75H1.75a.709.709 0 01-.75-.75v-7.5A.709.709 0 011.75 3zm.75 7.5h9v-6h-9v6z"
				fill="#808191"
			/>
			<path
				fill="#808191"
				d="M2.5 0h9v1.5h-9zM4.75 9.75L8.5 6l2.25 3.75h-6z"
			/>
			<circle cx={4.75} cy={6.75} r={0.75} fill="#808191" />
		</svg>
	);
}

export default SvgEditorPic;
