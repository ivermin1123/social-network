import * as React from "react";

function SvgSmile(props) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" {...props}>
			<path d="M10 0C4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10S15.5 0 10 0zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />
			<path d="M12.4 13.2c-1.4 1.1-3.4 1.1-4.8 0-.4-.3-1.1-.2-1.4.2s-.2 1.1.2 1.4c1.1.8 2.3 1.2 3.6 1.2s2.5-.4 3.6-1.2c.4-.3.5-1 .2-1.4-.3-.4-1-.5-1.4-.2z" />
			<circle cx={6.5} cy={7.5} r={1.5} />
			<circle cx={13.5} cy={7.5} r={1.5} />
		</svg>
	);
}

export default SvgSmile;
