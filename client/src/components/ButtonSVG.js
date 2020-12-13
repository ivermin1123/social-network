import React from "react";
import sprite from "../assets/icons/sprite.svg";

function ButtonSVG(props) {
	const { icon, classN } = props;
	return (
		<button type="button" className={classN}>
			<svg className={`icon ${icon}`}>
				<use href={`${sprite}#${icon}`} />
			</svg>
		</button>
	);
}

export default ButtonSVG;
