import * as React from "react";

function SvgSad(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={16}
			height={16}
			fill="none"
			{...props}
		>
			<path
				fill="url(#sad_svg__paint0_linear)"
				d="M16 8A8 8 0 11-.001 8 8 8 0 0116 8"
			/>
			<path
				fill="url(#sad_svg__paint1_linear)"
				d="M5.333 12.765c0 .137.094.235.25.235.351 0 .836-.625 2.417-.625s2.067.625 2.417.625c.156 0 .25-.098.25-.235C10.667 12.368 9.828 11 8 11c-1.828 0-2.667 1.368-2.667 1.765z"
			/>
			<path
				fill="url(#sad_svg__paint2_linear)"
				d="M3.599 8.8c0-.81.509-1.466 1.134-1.466.627 0 1.134.656 1.134 1.466 0 .338-.09.65-.238.898a.492.492 0 01-.301.225c-.14.037-.353.077-.595.077-.243 0-.453-.04-.595-.077a.49.49 0 01-.3-.225 1.741 1.741 0 01-.24-.898zm6.534 0c0-.81.508-1.466 1.133-1.466.627 0 1.134.656 1.134 1.466 0 .338-.09.65-.238.898a.49.49 0 01-.301.225c-.39.101-.8.101-1.19 0a.49.49 0 01-.3-.225 1.74 1.74 0 01-.238-.898z"
			/>
			<path
				fill="#000"
				d="M3.599 8.8c0-.81.509-1.466 1.134-1.466.627 0 1.134.656 1.134 1.466 0 .338-.09.65-.238.898a.492.492 0 01-.301.225c-.14.037-.353.077-.595.077-.243 0-.453-.04-.595-.077a.49.49 0 01-.3-.225 1.741 1.741 0 01-.24-.898zm6.534 0c0-.81.508-1.466 1.133-1.466.627 0 1.134.656 1.134 1.466 0 .338-.09.65-.238.898a.49.49 0 01-.301.225c-.39.101-.8.101-1.19 0a.49.49 0 01-.3-.225 1.74 1.74 0 01-.238-.898z"
				filter="url(#sad_svg__filter0_i)"
			/>
			<path
				fill="#4E506A"
				d="M4.616 7.986c.128.125.136.372.017.55-.12.179-.32.223-.448.097-.128-.125-.135-.372-.017-.55.12-.18.32-.222.448-.097zm6.489 0c.128.125.136.372.018.55-.12.179-.32.223-.45.097-.127-.125-.134-.372-.015-.55.119-.18.319-.222.447-.097z"
			/>
			<path
				fill="url(#sad_svg__paint3_linear)"
				d="M4.157 5.153c.332-.153.596-.22.801-.22.277 0 .451.12.55.307.175.329.096.4-.198.459-1.106.224-2.217.942-2.699 1.39-.3.28-.589-.03-.436-.274.154-.244.774-1.105 1.982-1.662zm6.335.087c.1-.187.273-.306.55-.306.206 0 .47.066.801.219 1.208.557 1.828 1.418 1.981 1.662.153.244-.134.554-.435.274-.483-.448-1.593-1.166-2.7-1.39-.294-.058-.37-.13-.197-.46z"
			/>
			<path
				fill="url(#sad_svg__paint4_linear)"
				d="M13.5 16c-.828 0-1.5-.748-1.5-1.671 0-.922.356-1.545.643-2.147.598-1.258.716-1.432.857-1.432.141 0 .259.174.857 1.432.287.602.643 1.225.643 2.147 0 .923-.672 1.671-1.5 1.671z"
			/>
			<path
				fill="url(#sad_svg__paint5_linear)"
				d="M13.5 13.606c-.328 0-.594-.296-.594-.66 0-.366.141-.613.255-.852.236-.498.283-.566.34-.566.055 0 .102.068.338.566.114.24.255.486.255.851s-.266.661-.594.661"
			/>
			<defs>
				<linearGradient
					id="sad_svg__paint0_linear"
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
					id="sad_svg__paint1_linear"
					x1={8}
					x2={8}
					y1={11}
					y2={13}
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#472315" />
					<stop offset={1} stopColor="#8B3A0E" />
				</linearGradient>
				<linearGradient
					id="sad_svg__paint2_linear"
					x1={7.999}
					x2={7.999}
					y1={7.334}
					y2={10}
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#191A33" />
					<stop offset={0.872} stopColor="#3B426A" />
				</linearGradient>
				<linearGradient
					id="sad_svg__paint3_linear"
					x1={8}
					x2={8}
					y1={4.934}
					y2={7.199}
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#E78E0D" />
					<stop offset={1} stopColor="#CB6000" />
				</linearGradient>
				<linearGradient
					id="sad_svg__paint4_linear"
					x1={13.5}
					x2={13.5}
					y1={15.05}
					y2={11.692}
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#35CAFC" />
					<stop offset={1} stopColor="#007EDB" />
				</linearGradient>
				<linearGradient
					id="sad_svg__paint5_linear"
					x1={13.5}
					x2={13.5}
					y1={11.528}
					y2={13.606}
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#6AE1FF" stopOpacity={0.287} />
					<stop offset={1} stopColor="#A8E3FF" stopOpacity={0.799} />
				</linearGradient>
				<filter
					id="sad_svg__filter0_i"
					width={8.801}
					height={2.666}
					x={3.599}
					y={7.334}
					colorInterpolationFilters="sRGB"
					filterUnits="userSpaceOnUse"
				>
					<feFlood floodOpacity={0} result="BackgroundImageFix" />
					<feBlend
						in="SourceGraphic"
						in2="BackgroundImageFix"
						result="shape"
					/>
					<feColorMatrix
						in="SourceAlpha"
						result="hardAlpha"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					/>
					<feOffset />
					<feGaussianBlur stdDeviation={0.5} />
					<feComposite
						in2="hardAlpha"
						k2={-1}
						k3={1}
						operator="arithmetic"
					/>
					<feColorMatrix values="0 0 0 0 0.0411227 0 0 0 0 0.0430885 0 0 0 0 0.0922353 0 0 0 0.819684 0" />
					<feBlend in2="shape" result="effect1_innerShadow" />
				</filter>
			</defs>
		</svg>
	);
}

export default SvgSad;
