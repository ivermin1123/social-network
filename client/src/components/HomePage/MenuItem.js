import React from "react";
import sprite from "../../assets/icons/sprite.svg";

function MenuItem(props) {
	const { icon, name, hasAdd, handleActive, info } = props;

	return (
		<a
			className={`sidebar__item${info.active ? " active" : ""}`}
			href="#/"
			onClick={() => handleActive(info.id)}
		>
			<div className="sidebar__icon">
				<div className="sidebar__add">
					<svg className="icon icon-add">
						<use href={`${sprite}#${icon}`} />
					</svg>
				</div>
			</div>
			<div className="sidebar__text">{name}</div>
			{hasAdd ? (
				<div className="sidebar__add">
					<svg className="icon icon-add">
						<use href={`${sprite}#icon-add`} />
					</svg>
				</div>
			) : null}
		</a>
	);
}

export default MenuItem;
