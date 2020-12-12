import * as React from "react";

function SvgBox(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={18}
			height={16}
			{...props}
		>
			<path
				fill="#808191"
				d="M14.5 5.5a1 1 0 01.993.883l.007.117v8a1 1 0 01-.883.993l-.117.007h-11a1 1 0 01-.993-.883L2.5 14.5v-8a1 1 0 011.993-.117L4.5 6.5v7h9v-7a1 1 0 01.883-.993L14.5 5.5zm-3 1a1 1 0 011 1v3a1 1 0 01-1 1h-5a1 1 0 01-1-1v-3a1 1 0 011-1zm-1 2h-3v1h3v-1zm6-8a1 1 0 011 1v3a1 1 0 01-1 1h-15a1 1 0 01-1-1v-3a1 1 0 011-1zm-1 2h-13v1h13v-1z"
			/>
		</svg>
	);
}

export default SvgBox;
