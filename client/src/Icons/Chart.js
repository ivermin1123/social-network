import * as React from "react";

function SvgChart(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={22}
			height={22}
			{...props}
		>
			<path
				fill="#1b1d21"
				d="M15.686.25c3.646 0 6.064 2.598 6.064 6.335v8.83c0 3.737-2.42 6.335-6.064 6.335h-9.37C2.67 21.75.25 19.152.25 15.415v-8.83C.25 2.85 2.675.25 6.314.25zm0 1.5h-9.37c-2.786 0-4.564 1.907-4.564 4.835v8.83c0 2.932 1.772 4.835 4.564 4.835h9.37c2.792 0 4.564-1.903 4.564-4.835v-8.83c0-2.932-1.772-4.835-4.564-4.835zM6.37 8.452a.75.75 0 01.743.648l.007.102v6.86a.75.75 0 01-1.493.102l-.007-.102v-6.86a.75.75 0 01.75-.75zm4.667-3.283a.75.75 0 01.743.648l.007.102v10.143a.75.75 0 01-1.493.102l-.007-.102V5.92a.75.75 0 01.75-.75zm4.59 6.908a.75.75 0 01.743.648l.007.102v3.235a.75.75 0 01-1.493.102l-.007-.102v-3.235a.75.75 0 01.75-.75z"
			/>
		</svg>
	);
}

export default SvgChart;