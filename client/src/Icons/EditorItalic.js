import * as React from "react";

function SvgEditorItalic(props) {
	return (
		<svg
			width={6}
			height={12}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M6 1.5V0H1.5v1.5h.953c.228 0 .404.202.371.428L1.692 9.856a.75.75 0 01-.743.644H0V12h4.5v-1.5h-.953a.375.375 0 01-.371-.428l1.132-7.928a.75.75 0 01.743-.644H6z"
				fill="#808191"
			/>
		</svg>
	);
}

export default SvgEditorItalic;
