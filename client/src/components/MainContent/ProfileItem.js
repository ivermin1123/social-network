import React from "react";
import { Link } from "react-router-dom";
import sprite from "../../assets/icons/sprite.svg";

function ProfileItem(props) {
	const { icon, name, href, isOpenPopup, handleClick } = props;
	return (
		<Link
			className={`header__link${isOpenPopup ? "js-popup-open" : ""}`}
			to={href}
			onClick={handleClick ? (e) => handleClick(e) : null}
		>
			<div className="header__img">
				<svg className={`icon ${icon}`}>
					<use href={`${sprite}#${icon}`} />
				</svg>
			</div>
			{name}
		</Link>
	);
}

export default ProfileItem;
