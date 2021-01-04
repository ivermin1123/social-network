import React, { useState } from "react";
import { connect } from "react-redux";

import FriendRequestItem from "../components/FriendRequest/FriendRequestItem";

function FriendRequestPage(props) {
	const { receiveReqFri, sendReqFri } = props;
	const [active, setActive] = useState(false);

	const ListFriReq = (props) => {
		const { data } = props;
		return data.length ? (
			<div className="trending__list">
				{data.map((user, index) => (
					<FriendRequestItem
						key={user._id}
						data={user}
						index={index + 1}
						active={active}
						setActive={setActive}
					/>
				))}
			</div>
		) : (
			<h2>Không có lời mời kết bạn nào.</h2>
		);
	};
	return (
		<div className="page__center">
			<div className="trending">
				<div className="trending__row">
					<div className="trending__col">
						<div className="trending__sorting">
							<div className="trending__field field mobile-show">
								<div className="field__wrap">
									<select className="field__select purple">
										<option>Lời mời kết bạn đã nhận</option>
										<option>Lời mời kết bạn đã gửi</option>
									</select>
								</div>
							</div>
							<div className="trending__tags">
								<button
									type="button"
									className={`trending__tag${
										active === false
											? " trending__tag_all"
											: ""
									}`}
									onClick={() => setActive(false)}
								>
									Lời mời kết bạn đã nhận
								</button>
								<button
									type="button"
									className={`trending__tag${
										active === true
											? " trending__tag_all"
											: ""
									}`}
									onClick={() => setActive(true)}
								>
									Lời mời kết bạn đã gửi
								</button>
							</div>
							{/* <div className="trending__field field">
						<div className="field__wrap">
							<select className="field__select">
								<option>Now</option>
								<option>Yesterday</option>
							</select>
						</div>
					</div> */}
						</div>
						{active === false ? (
							<ListFriReq data={receiveReqFri} />
						) : (
							<ListFriReq data={sendReqFri} />
						)}
						{/* <div className="trending__btns">
							<button
								type="button"
								className="trending__btn btn btn_gray"
							>
								Xem thêm
							</button>
						</div> */}
					</div>
					<div className="trending__col">Có thể bạn biết?</div>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	loadingUserProfile: state.users.loadingUserProfile,
	infoUser: state.users.infoUser,
	sendReqFri: state.users.sendReqFri,
	receiveReqFri: state.users.receiveReqFri,
});

export default connect(mapStateToProps)(FriendRequestPage);
