import * as React from "react";

function SvgBookmarks(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={14}
			height={16}
			{...props}
		>
			<path
				fill="#fff"
				d="M10 2a2 2 0 012 2v11.5a.5.5 0 01-.794.404L6 12.118.794 15.904a.5.5 0 01-.787-.32L0 15.5V4a2 2 0 012-2zm0 1H2a1 1 0 00-1 1v10.517l4.706-3.42a.5.5 0 01.51-.047l.08.047L11 14.518V4a1 1 0 00-.883-.993L10 3zm2-3a2 2 0 011.995 1.851L14 2v11a.5.5 0 01-.992.09L13 13V2a1 1 0 00-.883-.993L12 1H4a.5.5 0 01-.09-.992L4 0h8z"
			/>
		</svg>
	);
}

export default SvgBookmarks;
