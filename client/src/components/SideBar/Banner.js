import React from "react";
import sprite from "../../assets/icons/sprite.svg";

function Banner(props) {
	const { image, icon } = props;
	return (
		<div className="sidebar__banner">
			<div
				className="sidebar__bg"
				style={{ backgroundImage: `url(${image})` }}
			/>
			<button type="button" className="sidebar__remove">
				<svg className={`icon ${icon}`}>
					<use href={`${sprite}#${icon}`} />
				</svg>
			</button>
			<div className="sidebar__details">
				<div className="sidebar__title h5">
					Join the Unity&nbsp;Gaming
				</div>
				<div className="sidebar__info caption-sm">
					Discover the best livestream anywhere.
				</div>
				<button
					type="button"
					className="sidebar__btn btn btn_purple btn_wide"
				>
					Join Now
				</button>
			</div>
		</div>
	);
}

export default Banner;
