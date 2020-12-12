import React from "react";

import sprite from "../../assets/icons/sprite.svg";

function ProfileItem(props) {
	const { icon, name, href, isOpenPopup, handleClick } = props;
	return (
		<a
			className={`header__link${isOpenPopup ? "js-popup-open" : ""}`}
			href={href || "#/"}
			onClick={handleClick ? (e) => handleClick(e) : null}
		>
			<div className="header__img">
				<svg className={`icon ${icon}`}>
					<use href={`${sprite}#${icon}`} />
				</svg>
			</div>
			{name}
		</a>
	);
}

export default ProfileItem;
