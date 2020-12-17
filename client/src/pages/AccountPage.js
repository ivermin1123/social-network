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

const AccountPage = (props) => {
	const { accountId } = useParams();
	const dispatch = useDispatch();

	const [userData, setUserData] = useState(null);
	const [isType, setIsType] = useState(-1);
	const { loadingUserProfile, infoUser } = props;
	console.log("infoUser", infoUser);

	useEffect(() => {
		dispatch(userActions.getUserProfile(accountId)).then((data) => {
			setUserData(data.data);
			if (accountId === data.data._id) {
				setIsType(0);
			} else {
				setIsType(
					data.data.friends.indexOf(infoUser._id) > -1
						? 1
						: -1
				);
			}
		});
	}, []);
	console.log("userData", userData);
	if (loadingUserProfile) return null;

	return userData ? (
		<div className="main main_channel js-main">
			<SliderComponent />
			<div className="page__center page__center_pt0">
				<div className="author author_big">
					<div className="author__container">
						<AuthorDetail userData={userData} />
						<AuthorButton isType={isType} />
					</div>
				</div>
				<Catalog userData={userData} />
			</div>
		</div>
	) : null;
};

const mapStateToProps = (state) => ({
	loadingUserProfile: state.users.loadingUserProfile,
	infoUser: state.users.infoUser,
});

export default connect(mapStateToProps)(AccountPage);
