import React from "react";
import sprite from "../assets/icons/sprite.svg";

function ButtonSVG(props) {
	const { icon, classN, onClick } = props;
	return (
		<button type="button" className={classN} onClick={onClick}>
			<svg className={`icon ${icon}`}>
				<use href={`${sprite}#${icon}`} />
			</svg>
		</button>
	);
}

export default ButtonSVG;
