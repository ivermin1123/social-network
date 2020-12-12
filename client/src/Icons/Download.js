import * as React from "react";

function SvgDownload(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={18}
			height={19}
			{...props}
		>
			<path
				fill="#7fba7a"
				d="M17 17a1 1 0 01.117 1.993L17 19H1a1 1 0 01-.117-1.993L1 17h16zM9 0a1 1 0 01.993.883L10 1v9.585l4.293-4.292a1 1 0 011.32-.083l.094.083a1 1 0 01.083 1.32l-.083.094-6 6a1 1 0 01-1.32.083l-.094-.083-6-6a1 1 0 011.32-1.497l.094.083L8 10.585V1a1 1 0 011-1z"
			/>
		</svg>
	);
}

export default SvgDownload;
