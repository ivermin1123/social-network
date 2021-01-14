import React from "react";
import sprite from "../../assets/icons/sprite.svg";
// import LogoWhite from "../../Icons/LogoWhite";
import logo from "../../assets/image/logo_hutech_2.png";

const FormLeft = () => {
	return (
		<div className="login__wrap">
			<a className="login__logo" href="/">
				<img src={logo} alt="" style={{ marginLeft: "10px" }} />
			</a>
			<div className="login__info">Tri thức, đạo đức, sáng tạo.</div>
			<div className="games" style={{ display: "none" }}>
				<a className="games__item" href="/#">
					<div className="games__preview">
						<img
							className="games__pic"
							src="img/game-1.png"
							alt=""
						/>
					</div>
					<div className="games__details">
						<div className="games__title">Call of Duty®</div>
						<div className="games__category">Shooting</div>
						<div className="status orange">2.8K viewers</div>
					</div>
				</a>
				<a className="games__item" href="#/">
					<div className="games__preview">
						<img
							className="games__pic"
							src="img/game-2.png"
							alt=""
						/>
					</div>
					<div className="games__details">
						<div className="games__title">The Dota 2</div>
						<div className="games__category">eSport</div>
						<div className="status orange">2.8K viewers</div>
					</div>
				</a>
				<a className="games__item" href="#/">
					<div className="games__preview">
						<img
							className="games__pic"
							src="img/game-3.png"
							alt=""
						/>
					</div>
					<div className="games__details">
						<div className="games__title">League of Legends®</div>
						<div className="games__category">Online Game</div>
						<div className="status orange">2.8K viewers</div>
					</div>
				</a>
			</div>
			<a className="login__add" href="/#" style={{ display: "none" }}>
				<svg className="icon icon-add-square">
					<svg className="icon icon-add">
						<use href={`${sprite}#icon-add-square`} />
					</svg>
				</svg>
				Discover more
			</a>
		</div>
	);
};

export default FormLeft;
