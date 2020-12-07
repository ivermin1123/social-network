import * as React from "react";

function SvgPicture(props) {
	return (
		<svg
			width={20}
			height={20}
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M1.97 2.533H4.1c.547 0 1.078-.261 1.193-.583C5.675.879 6.868.01 7.954.01l4.15-.01c1.088 0 2.28.868 2.661 1.94.062.172.59.593 1.135.593h2.13c1.088 0 1.97.87 1.97 1.94V18.06c0 1.071-.883 1.94-1.97 1.94H1.97C.882 20 0 19.13 0 18.06V4.473c0-1.071.883-1.94 1.97-1.94zM10 17.089c3.264 0 5.91-2.607 5.91-5.823 0-3.215-2.646-5.822-5.91-5.822-3.264 0-5.91 2.607-5.91 5.822 0 3.216 2.646 5.823 5.91 5.823zm0-2.911c-1.632 0-2.955-1.304-2.955-2.912 0-1.607 1.323-2.91 2.955-2.91 1.632 0 2.955 1.303 2.955 2.91 0 1.608-1.323 2.912-2.955 2.912z"
				fill="#000"
				fillRule="nonzero"
			/>
		</svg>
	);
}

export default SvgPicture;