import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { Avatar } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";

import HeaderItem from "./HeaderItem";
import NotificationItem from "./NotificationItem";
import OutsideClick from "../../helpers/clickOutside";
import ProfileItem from "./ProfileItem";
import sprite from "../../assets/icons/sprite.svg";
import avatar2 from "../../assets/image/avatarDefault.png";
import userActions from "../../actions/user.actions";
import notifyActions from "../../actions/notify.actions";
import LINK_CONSTANTS from "../../constants/link.constants";
import SearchBar from "./SearchBar";
import Setting from "./Setting";

function Header(props) {
	const dispatch = useDispatch();
	const [isActive1, setActive1] = useState(false);
	const [isActive2, setActive2] = useState(false);
	const [isActive3, setActive3] = useState(false);
	const [isActive4, setActive4] = useState(false);
	const [isModalShow, setIsModalShow] = useState(false);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [listNotify, setListNotify] = useState();
	const [totalNotify, setTotalNotify] = useState(0);
	const { infoUser } = props;
	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(userActions.logout());
	};

	const fetchMoreData = () => {
		dispatch(notifyActions.getUserNotify({ currentPage: page + 1 })).then(
			(data) => {
				if (data.data.length === 0) {
					setHasMore(false);
				}
				setListNotify(listNotify.concat(data.data));
				setTotalNotify(data.totalNotify);
			}
		);
		setPage(page + 1);
	};

	useEffect(() => {
		dispatch(notifyActions.getUserNotify({ currentPage: 1 })).then(
			(data) => {
				console.log({ data });
				setListNotify(data.data);
				setTotalNotify(data.totalNotify);
			}
		);
	}, []);

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
						Menu
						<svg className="icon icon-arrow-down">
							<use href={`${sprite}#icon-arrow-down`} />
						</svg>
					</div>
					<div className="header__body">
						<HeaderItem name="Nhân" icon1="icon-star" openPopup />
						<HeaderItem name="Định" icon1="icon-star" />
						<HeaderItem name="Thắng" icon1="icon-star" />
						<HeaderItem name="Thiên" icon1="icon-star" />
					</div>
				</div>
			</OutsideClick>
			<SearchBar sprite={sprite} />
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
							{/* <HeaderItem
								name="New Videos"
								icon1="icon-camera"
								icon2="icon-add"
							/> */}
							<HeaderItem
								name="Livestream"
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
							<div className="header__counter">
								{totalNotify === 0 ? null : totalNotify}
							</div>
						</button>
						<div className="header__body js-header-body">
							<div className="notifications">
								{/* <div className="notifications__info h6">
									Recent Notification
								</div> */}
								<div className="notifications__list">
									{listNotify ? (
										<InfiniteScroll
											// style={{
											// 	overflow: "hidden",
											// 	padding: "1px",
											// }}
											dataLength={listNotify.length}
											next={fetchMoreData}
											height="auto"
											maxHeight={315}
											hasMore={hasMore}
											loader={
												<div
													style={{ display: "flex" }}
												>
													<LoadingOutlined
														style={{
															fontSize: "50px",
															color: "#08c",
															margin: "auto",
														}}
													/>
												</div>
											}
											endMessage={
												<p
													style={{
														textAlign: "center",
													}}
													className="notifications__item"
												>
													<b>
														Yay! Bạn đã xem hết tất
														cả các bài viết rồi. 😛
													</b>
												</p>
											}
										>
											{listNotify.map((notify) => (
												<NotificationItem
													key={notify._id}
													notify={notify}
												/>
											))}
										</InfiniteScroll>
									) : (
										<h4 style={{ textAlign: "center" }}>
											Bạn không có thông báo mới nào
										</h4>
									)}
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
						<Avatar
							size={48}
							className="header__pic"
							src={
								infoUser && infoUser.avatar[0]
									? `${LINK_CONSTANTS.LINK_S3}${infoUser.avatar[0].path}`
									: avatar2
							}
						/>
					</a>
					<div className="header__body">
						<ProfileItem
							icon="icon-profile"
							name="Trang cá nhân"
							href={`/account/${infoUser._id}`}
						/>
						<ProfileItem
							icon="icon-document"
							name="Lời mời kết bạn"
							href="/friend-request"
						/>
						{/* <ProfileItem icon="icon-joystick" name="My Chanel" /> */}
						<ProfileItem
							icon="icon-settings"
							name="Cài đặt"
							handleClick={() => {
								setIsModalShow(true);
							}}
						/>
						<ProfileItem
							icon="icon-logout"
							name="Đăng xuất"
							handleClick={handleLogout}
						/>
					</div>
				</div>
			</OutsideClick>
			<Setting
				infoUser={infoUser}
				visible={isModalShow}
				handleOk={() => {
					setIsModalShow(false);
				}}
				handleCancel={() => {
					setIsModalShow(false);
				}}
			/>
		</div>
	);
}

const mapStateToProps = (state) => ({
	infoUser: state.users.infoUser,
});

export default connect(mapStateToProps)(Header);
