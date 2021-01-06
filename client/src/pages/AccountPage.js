import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import {
	Catalog,
	SliderComponent,
	AuthorButton,
	AuthorDetail,
} from "../components/_components";
import userActions from "../actions/user.actions";
import "../assets/styles/_account_page.scss";

const AccountPage = (props) => {
	const { accountId } = useParams();
	const dispatch = useDispatch();

	const [userData, setUserData] = useState(null);
	const [isFriend, setIsFriend] = useState(false);
	// eslint-disable-next-line no-unused-vars
	const [isSendReq, setIsSendReq] = useState(false);
	const { loadingUserProfile, infoUser, sendReqFri } = props;
	const checkIsType = () => {
		if (infoUser.friends.filter((e) => e._id === accountId).length) {
			setIsFriend(true);
		}
		if (
			sendReqFri.filter((user) => user.receiver[0]._id === accountId)
				.length
		) {
			setIsSendReq(true);
		}
		// else setIsSendReq(true);
	};

	useEffect(() => {
		dispatch(userActions.getUserProfile(accountId)).then((data) => {
			setUserData(data.data);
		});
		checkIsType();
	}, [accountId]);

	if (loadingUserProfile) return null;

	return userData ? (
		<div className="main main_channel js-main">
			<SliderComponent
				userData={userData}
				isSendReq={isSendReq}
				isFriend={isFriend}
			/>
			<div className="page__center page__center_pt0">
				<div className="author author_big">
					<div className="author__container">
						<AuthorDetail
							isMySelf={infoUser._id === accountId}
							userData={userData}
							isSendReq={isSendReq}
							isFriend={isFriend}
						/>
						{infoUser._id === accountId ? (
							<AuthorButton
								isMySelf
								isSendReq={isSendReq}
								isFriend={isFriend}
							/>
						) : (
							<AuthorButton
								sender={infoUser._id}
								receiver={accountId}
								setIsFriend={setIsFriend}
								isSendReq={isSendReq}
								isFriend={isFriend}
							/>
						)}
					</div>
				</div>
				<Catalog userData={userData} isFriend={isFriend} />
			</div>
		</div>
	) : null;
};

const mapStateToProps = (state) => ({
	loadingUserProfile: state.users.loadingUserProfile,
	infoUser: state.users.infoUser,
	sendReqFri: state.users.sendReqFri,
});

export default connect(mapStateToProps)(AccountPage);
