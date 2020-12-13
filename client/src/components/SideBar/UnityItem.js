import React from "react";
import sprite from "../../assets/icons/sprite.svg";

function AppItem(props) {
	const { icon, name, counter, href } = props;
	return (
		<a className="sidebar__item" href={href || "#/"}>
			<div className="sidebar__icon">
				<svg className={`icon ${icon}`}>
					<use href={`${sprite}#${icon}`} />
				</svg>
			</div>
			<div className="sidebar__text">{name}</div>
			{counter ? <div className="sidebar__counter">{counter}</div> : null}
		</a>
	);
}

export default AppItem;
