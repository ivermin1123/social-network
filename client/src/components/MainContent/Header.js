import React, { useState } from "react";
import { useDispatch, connect } from "react-redux";

import HeaderItem from "./HeaderItem";
import NotificationItem from "./NotificationItem";
import OutsideClick from "../../helpers/clickOutside";
import ProfileItem from "./ProfileItem";
import sprite from "../../assets/icons/sprite.svg";
import avatar2 from "../../assets/image/avatarDefault.png";
import userActions from "../../actions/user.actions";
import LINK_CONSTANTS from "../../constants/link.constants";

function Header(props) {
	const dispatch = useDispatch();
	const [isActive1, setActive1] = useState(false);
	const [isActive2, setActive2] = useState(false);
	const [isActive3, setActive3] = useState(false);
	const [isActive4, setActive4] = useState(false);

	const { infoUser } = props;
	const { avatar } = infoUser;

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(userActions.logout());
	};

	return (
		<div className="header">
			<button type="button" className="header__burger" />
			<OutsideClick callback={setActive1}>
				<div
					className={`header__item header__item_browse js-header-item${
						isActive1 ? " active" : ""
					}`}
					onClick={() => setActive1(!isActive1)}
				>
					<div className="header__head js-header-head">
						<svg className="icon icon-location">
							<use href={`${sprite}#icon-location`} />
						</svg>
						Browse
						<svg className="icon icon-arrow-down">
							<use href={`${sprite}#icon-arrow-down`} />
						</svg>
					</div>
					<div className="header__body">
						<HeaderItem name="Đức" icon1="icon-star" />
						<HeaderItem name="Năng" icon1="icon-star" />
						<HeaderItem name="Thắng" icon1="icon-star" />
						<HeaderItem name="Số" icon1="icon-star" />
						<HeaderItem name="Nhân" icon1="icon-star" openPopup />
						<HeaderItem name="Định" icon1="icon-star" />
						<HeaderItem name="Thắng" icon1="icon-star" />
						<HeaderItem name="Thiên" icon1="icon-star" />
					</div>
				</div>
			</OutsideClick>

			<form className="header__search" style={{ display: "none" }}>
				<input
					className="header__input"
					type="text"
					placeholder="Search Everything"
				/>
				<button type="button" className="header__btn-search">
					<svg className="icon icon-search">
						<use href={`${sprite}#icon-search`} />
					</svg>
				</button>
			</form>
			<div className="header__control">
				<OutsideClick callback={setActive2} classN="header__item">
					<div
						className={`header__item header__item_add js-header-item${
							isActive2 ? " active" : ""
						}`}
						onClick={() => setActive2(!isActive2)}
					>
						<button
							type="button"
							className="header__head js-header-head"
						>
							<svg className="icon icon-plus-sm">
								<use href={`${sprite}#icon-plus-sm`} />
							</svg>
						</button>
						<div className="header__body js-header-body">
							<HeaderItem
								name="New Videos"
								icon1="icon-camera"
								icon2="icon-add"
							/>
							<HeaderItem
								name="Go live"
								icon1="icon-star"
								icon2="icon-live"
							/>
						</div>
					</div>
				</OutsideClick>
				<OutsideClick callback={setActive3}>
					<div
						className={`header__item header__item_notifications js-header-item${
							isActive3 ? " active" : ""
						}`}
						onClick={() => setActive3(!isActive3)}
					>
						<button
							type="button"
							className="header__head js-header-head"
						>
							<svg className="icon icon-bell">
								<use href={`${sprite}#icon-bell`} />
							</svg>
							<div className="header__counter">999</div>
						</button>
						<div className="header__body js-header-body">
							<div className="notifications">
								<div className="notifications__info h6">
									Recent Notification
								</div>
								<div className="notifications__list">
									<NotificationItem
										name="Quốc Hoàng"
										time="2h"
										content="Commented on"
										mention="Your last video"
									/>
									<NotificationItem
										name="Anh Tú"
										time="4h"
										content="Send you a message 🌈."
									/>
								</div>
							</div>
						</div>
					</div>
				</OutsideClick>
			</div>
			<OutsideClick callback={setActive4}>
				<div
					className={`header__item header__item_profile js-header-item${
						isActive4 ? " active" : ""
					}`}
					onClick={() => setActive4(!isActive4)}
				>
					<a className="header__head" href="#/">
						<img
							className="header__pic"
							src={
								avatar
									? `${LINK_CONSTANTS.LINK_S3}${avatar.path}`
									: avatar2
							}
							alt=""
						/>
					</a>
					<div className="header__body">
						<ProfileItem icon="icon-profile" name="Profile" />
						<ProfileItem icon="icon-document" name="My Playlist" />
						<ProfileItem icon="icon-joystick" name="My Chanel" />
						<ProfileItem icon="icon-settings" name="Setting" />
						<ProfileItem
							icon="icon-logout"
							name="Logout"
							handleClick={handleLogout}
						/>
					</div>
				</div>
			</OutsideClick>
		</div>
	);
}

const mapStateToProps = (state) => ({
	infoUser: state.users.infoUser,
});

export default connect(mapStateToProps)(Header);
