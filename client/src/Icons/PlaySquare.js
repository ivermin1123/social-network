import * as React from "react";

function SvgPlaySquare(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={18}
			height={18}
			{...props}
		>
			<path
				fill="#fff"
				d="M15.5 3.5a2 2 0 012 2v10a2 2 0 01-2 2h-13a2 2 0 01-2-2v-10a2 2 0 012-2zm0 2h-13v10h13v-10zm-9 2a1 1 0 011.514-.857l5 3a1 1 0 010 1.715l-5 3A1 1 0 016.5 13.5zm2 1.766v2.467l2.056-1.233L8.5 9.266zM13.5 0a1 1 0 011 1 1 1 0 01-.883.993L13.5 2h-9A1 1 0 014.383.007L4.5 0h9z"
			/>
		</svg>
	);
}

export default SvgPlaySquare;
