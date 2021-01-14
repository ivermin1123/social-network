import React from "react";
import sprite from "../../assets/icons/sprite.svg";

function Banner(props) {
	const { icon } = props;
	return (
		<div className="sidebar__banner">
			<div
				className="sidebar__bg"
				style={{
					backgroundImage: `url(https://cdn.pixabay.com/photo/2016/12/28/11/56/headphones-1935971_960_720.png)`,
				}}
			/>
			<button
				type="button"
				className="sidebar__remove"
				style={{ display: "none" }}
			>
				<svg className={`icon ${icon}`}>
					<use href={`${sprite}#${icon}`} />
				</svg>
			</button>
			<div className="sidebar__details">
				{/* <div className="sidebar__title h5"></div> */}
				{/* <div className="sidebar__info caption-sm">
					Hãy tận hưởng nhé !!
				</div> */}
				<button
					type="button"
					className="sidebar__btn btn btn_purple btn_wide"
				>
					<a
						href="https://www.facebook.com/ivermin1123/"
						style={{ color: "white" }}
					>
						Về chúng tôi
					</a>
				</button>
			</div>
		</div>
	);
}

export default Banner;
