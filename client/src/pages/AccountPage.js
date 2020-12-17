import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import sprite from "../assets/icons/sprite.svg";
import ava from "../assets/image/ava-1.png";
import { Catalog, SliderComponent } from "../components/_components";
import userActions from "../actions/user.actions";

const AccountPage = (props) => {
	const { accountId } = useParams();
	const dispatch = useDispatch();

	const [userData, setUserData] = useState(null);
	const [isFriend, setIsFriend] = useState(-1);
	const { loadingUserProfile, infoUser } = props;
	console.log("infoUser", infoUser);


	useEffect(() => {
		dispatch(userActions.getUserProfile(accountId)).then((data) => {
			setUserData(data.data);
			setIsFriend(data.data.infoUser.friends.indexOf(infoUser._id));
		});
	}, []);
	console.log('userData', userData);
	if (loadingUserProfile) return null;

	return userData && userData.infoUser ? (
		<div className="main main_channel js-main">
			<SliderComponent />
			<div className="page__center page__center_pt0">
				<div className="author author_big">
					<div className="author__container">
						<div className="author__details">
							<div className="ava ava_online">
								{userData.infoUser.avatar ? (
									<img
										className="ava__pic"
										src={userData.infoUser.avatar}
										alt=""
									/>
								) : (
									<img
										className="ava__pic"
										src={ava}
										alt=""
									/>
								)}
							</div>
							<div className="author__wrap">
								<div className="author__man h2 confirm">
									{userData.infoUser.firstName
										? `${userData.infoUser.firstName} `
										: ""}
									{userData.infoUser.lastName || ""}
								</div>
								<div className="author__parameters">
									<div className="author__parameter h6">
										{userData.infoUser.followers
											? `${userData.infoUser.followers.length} người theo dõi`
											: `${userData.infoUser.friends.length} bạn bè` ||
											  ""}
									</div>
									<div className="author__parameter h6">
										120 videos
									</div>
								</div>
							</div>
						</div>
						<div className="author__btns">
							{isFriend === -1 ? (
								<button
									type="button"
									className="author__btn btn btn_purple"
								>
									Kết bạn
								</button>
							) : (
								<button
									type="button"
									className="author__btn btn btn_purple"
								>
									Message
								</button>
							)}
							{isFriend === -1 ? (
								<button
									type="button"
									className="author__btn btn btn_asphalt btn_square"
								>
									<svg className="icon icon-add">
										<use href={`${sprite}#icon-add`} />
									</svg>
								</button>
							) : (
								<button
									type="button"
									className="author__btn btn btn_asphalt btn_square"
								>
									<svg className="icon icon-profile-check">
										<use
											href={`${sprite}#icon-profile-check`}
										/>
									</svg>
								</button>
							)}
						</div>
					</div>
				</div>
				<Catalog />
			</div>
		</div>
	) : null;
};

const mapStateToProps = (state) => ({
	loadingUserProfile: state.users.loadingUserProfile,
	infoUser: state.users.infoUser,
});

export default connect(mapStateToProps)(AccountPage);
