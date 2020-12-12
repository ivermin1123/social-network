import React from "react";

const FormLeft = () => {
	return (
		<div className="login__wrap">
			<a className="login__logo" href="index.html">
				<img className="login__pic" src="img/logo-white.svg" alt="" />
			</a>
			<div className="login__info">A Video Gaming Platfrom UI Kit</div>
			<div className="games">
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
				<a className="games__item" href="#">
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
				<a className="games__item" href="#">
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
			<a className="login__add" href="/#">
				<svg className="icon icon-add-square">
					<a href="img/sprite.svg#icon-add-square" />
				</svg>
				Discover more
			</a>
		</div>
	);
};

export default FormLeft;
