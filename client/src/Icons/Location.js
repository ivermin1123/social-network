import * as React from "react";

function SvgLocation(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={21}
			height={21}
			{...props}
		>
			<path
				fill="#11142d"
				d="M10.61.25c5.722 0 10.36 4.64 10.36 10.36s-4.64 10.36-10.36 10.36S.25 16.333.25 10.61 4.89.25 10.61.25zm0 1.5a8.86 8.86 0 100 17.72 8.86 8.86 0 000-17.72zm3.117 4.804a.75.75 0 01.94.94l-1.593 5.09a.75.75 0 01-.492.492l-5.09 1.593a.75.75 0 01-.94-.94l1.593-5.09a.75.75 0 01.492-.492zm-.92 1.86L9.46 9.46l-1.048 3.347 3.347-1.048 1.048-3.347z"
			/>
		</svg>
	);
}

export default SvgLocation;
