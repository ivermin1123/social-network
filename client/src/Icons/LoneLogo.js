import * as React from "react";

function SvgLoneLogo(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 25.1 25.2"
			{...props}
		>
			<path
				d="M12.5 0C5.6 0 0 5.2 0 11.7c0 3.6 1.8 7 4.7 9.1v4.4L9 22.8c1.2.3 2.4.5 3.6.5 6.9 0 12.5-5.2 12.5-11.7S19.5 0 12.5 0zm1.3 15.7l-3.2-3.4-6.2 3.4 6.8-7.3 3.3 3.4 6.1-3.4-6.8 7.3z"
				fill="#c6c6c6"
			/>
		</svg>
	);
}

export default SvgLoneLogo;
