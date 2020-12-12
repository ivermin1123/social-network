import * as React from "react";

function SvgEditorSmile(props) {
	return (
		<svg
			width={12}
			height={12}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M6 9.75c1.275 0 2.25-.975 2.25-2.25h-4.5c0 1.275.975 2.25 2.25 2.25z"
				fill="#808191"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12 3.75c0-.75-.6-1.425-1.35-1.5A5.937 5.937 0 006 0C4.2 0 2.475.825 1.35 2.25.6 2.325 0 3 0 3.75V6c0 3.3 2.7 6 6 6s6-2.7 6-6V3.75zm-1.5.75v.75H8.25v-1.5h2.25v.75zM8.25 2.25h.225C7.725 1.8 6.9 1.5 6 1.5c-.9 0-1.725.3-2.475.75h.225c.825 0 1.5.675 1.5 1.5h1.5c0-.825.675-1.5 1.5-1.5zM1.5 3.75h2.25v1.5H1.5v-1.5zm.075 3C1.95 8.85 3.75 10.5 6 10.5s4.05-1.65 4.425-3.75H8.25c-.825 0-1.5-.675-1.5-1.5h-1.5c0 .825-.675 1.5-1.5 1.5H1.575z"
				fill="#808191"
			/>
		</svg>
	);
}

export default SvgEditorSmile;
