import React from "react";
import sprite from "../../assets/icons/sprite.svg";

function HeaderItem(props) {
	const { href, name, openPopup, icon1, icon2 } = props;
	return (
		<a
			className={
				openPopup ? `header__line js-popup-open` : "header__line"
			}
			href={href || "#/"}
		>
			<div className="header__icon">
				<svg className={`icon ${icon1}`}>
					<use href={`${sprite}#${icon1}`} />
				</svg>
			</div>
			<div className="header__text">{name}</div>
			{icon2 ? (
				<div className="header__icon">
					<svg className={`icon ${icon2}`}>
						<use href={`${sprite}#${icon2}`} />
					</svg>
				</div>
			) : null}
		</a>
	);
}

export default HeaderItem;
