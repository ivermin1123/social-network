import * as React from "react";

function SvgHaha(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={16}
			height={16}
			fill="none"
			{...props}
		>
			<path
				fill="url(#haha_svg__paint0_linear)"
				d="M16 8A8 8 0 11-.001 8 8 8 0 0116 8"
			/>
			<path
				fill="url(#haha_svg__paint1_linear)"
				d="M3 8.008C3 10.023 4.006 14 8 14c3.993 0 5-3.977 5-5.992C13 7.849 11.39 7 8 7c-3.39 0-5 .849-5 1.008z"
			/>
			<path
				fill="url(#haha_svg__paint2_linear)"
				d="M4.541 12.5c.804.995 1.907 1.5 3.469 1.5 1.563 0 2.655-.505 3.459-1.5-.551-.588-1.599-1.5-3.459-1.5s-2.917.912-3.469 1.5z"
			/>
			<path
				fill="#2A3755"
				d="M6.213 4.144c.263.188.502.455.41.788-.071.254-.194.369-.422.37-.78.012-1.708.256-2.506.613-.065.029-.197.088-.332.085-.124-.003-.251-.058-.327-.237-.067-.157-.073-.388.276-.598.545-.33 1.257-.48 1.909-.604-.41-.303-.85-.56-1.315-.768-.427-.194-.38-.457-.323-.6.127-.317.609-.196 1.078.026a9 9 0 011.552.925zm3.577 0a8.955 8.955 0 011.55-.925c.47-.222.95-.343 1.078-.026.057.143.104.406-.323.6a7.028 7.028 0 00-1.313.768c.65.123 1.363.274 1.907.604.349.21.342.44.276.598-.077.18-.203.234-.327.237-.135.003-.267-.056-.332-.085-.797-.357-1.725-.6-2.504-.612-.228-.002-.351-.117-.422-.37-.091-.333.147-.6.41-.788v-.001z"
			/>
			<defs>
				<linearGradient
					id="haha_svg__paint0_linear"
					x1={8}
					x2={8}
					y1={1.64}
					y2={16}
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#FEEA70" />
					<stop offset={1} stopColor="#F69B30" />
				</linearGradient>
				<linearGradient
					id="haha_svg__paint1_linear"
					x1={8}
					x2={8}
					y1={7}
					y2={14}
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#472315" />
					<stop offset={1} stopColor="#8B3A0E" />
				</linearGradient>
				<linearGradient
					id="haha_svg__paint2_linear"
					x1={8.005}
					x2={8.005}
					y1={11}
					y2={13.457}
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#FC607C" />
					<stop offset={1} stopColor="#D91F3A" />
				</linearGradient>
			</defs>
		</svg>
	);
}

export default SvgHaha;
