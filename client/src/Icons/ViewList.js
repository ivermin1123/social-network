import * as React from "react";

function SvgViewList(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={18}
			height={18}
			{...props}
		>
			<path
				fill="#808191"
				d="M15.5.5a2 2 0 012 2v13a2 2 0 01-2 2h-13a2 2 0 01-2-2v-13a2 2 0 012-2zm0 2h-13v13h13v-13zm-3 8a1 1 0 01.117 1.993l-.117.007h-7a1 1 0 01-.117-1.993L5.5 10.5h7zm0-5a1 1 0 01.117 1.993L12.5 7.5h-7a1 1 0 01-.117-1.993L5.5 5.5h7z"
			/>
		</svg>
	);
}

export default SvgViewList;
