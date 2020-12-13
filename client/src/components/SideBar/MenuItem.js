import React from "react";
import { Link } from "react-router-dom";
import sprite from "../../assets/icons/sprite.svg";

function MenuItem(props) {
	const { icon, name, hasAdd, handleActive, info, href } = props;

	return (
		<Link
			className={`sidebar__item${info.active ? " active" : ""}`}
			to={href || "#/"}
			onClick={() => handleActive(info.id)}
		>
			<div className="sidebar__icon">
				<div className="sidebar__add">
					<svg className={`icon ${icon}`}>
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
		</Link>
	);
}

export default MenuItem;
