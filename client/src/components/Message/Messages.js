import React, { useEffect } from "react";
import { useDispatch, connect, useSelector } from "react-redux";
import moment from "moment";

import ScrollToBottom from "react-scroll-to-bottom";
import MessageItem from "./MessageItem";
import MessageFooter from "./MessageFooter";
import ButtonSVG from "../ButtonSVG";
import messageActions from "../../actions/message.actions";
import "react-perfect-scrollbar/dist/css/styles.css";

function checkTime(mess1, mess2, arrToCalculator) {
	console.log({ mess1, mess2, arrToCalculator });
	const time1m = moment(mess1.createdAt).unix();
	const time2m = moment(mess2.createdAt).unix();

	const unixTime = Math.abs(time1m - time2m);
	const minutes = Math.round(unixTime / 60);
	if (minutes > 2 || mess1.sender[0]._id !== mess2.sender[0]._id) {
		return false;
	}
	return true;
}

function dataToShow(arrToCalculator) {
	let arr = [];
	const arrToShow = [];
	for (let i = 0; i < arrToCalculator.length; i++) {
		arr.push(arrToCalculator[i]);
		if (i === arrToCalculator.length - 1) {
			arrToShow.push(arr.reverse());
		} else {
			const result = checkTime(
				arrToCalculator[i],
				arrToCalculator[i + 1],
				arrToCalculator
			);
			if (!result) {
				arrToShow.push(arr.reverse());
				arr = [];
			}
		}
	}
	return arrToShow.reverse();
}

function Messages(props) {
	const {
		messages,
		isConnecting,
		conversationId,
		loadingMessage,
		conversations,
		loadingConversation,
	} = props;
	const dispatch = useDispatch();
	const { infoUser } = useSelector((state) => state.users);
	const { socket } = useSelector((state) => state.socket);

	useEffect(() => {
		dispatch(messageActions.getMessages(conversationId));
		if (isConnecting) {
			socket.emit("CSS_JOIN", {
				name: `${infoUser.username}`,
				room: conversationId,
			});
		}
	}, []);

	let arrToShow = [];
	if (!loadingMessage) {
		// if (!messages.data.length) return null;
		console.log({ messages });
		arrToShow = dataToShow(messages.data);
	}

	let conversationName;
	if (!loadingConversation) {
		const conversation = conversations.data.filter(
			(conversation) => conversation._id === conversationId
		);
		if (!conversation.length) {
			return <h2>Cuộc trò chuyện này không tồn tại</h2>;
		}
		conversationName = conversation[0].name;
		if (conversation[0].members.length === 2) {
			conversation[0].members.forEach((member) => {
				if (member._id !== infoUser._id) {
					conversationName = `${member.firstName} ${member.lastName}`;
				}
			});
		}
	} else {
		return null;
	}

	return (
		<div className="chat__container">
			<div className="chat__top">
				<div className="chat__info h3 mr-auto">{conversationName}</div>
				<div className="chat__actions">
					<ButtonSVG icon="icon-star-fill" classN="chat__action" />
					<ButtonSVG icon="icon-profile" classN="chat__action" />
					<ButtonSVG icon="icon-game-play" classN="chat__action" />
				</div>
			</div>
			<ScrollToBottom>
				<div className="messages">
					<div className="messages__list">
						{arrToShow.map((arr) => {
							const fullName = `${arr[0].sender[0].firstName} ${arr[0].sender[0].lastName}`;
							if (arr.length > 1) {
								if (arr[0].sender[0]._id === infoUser._id) {
									return (
										<MessageItem
											avatar={
												arr[0].sender[0].avatar[0].path
											}
											listMessage={arr}
											isRight
											fullName={fullName}
											key={arr[0]._id}
										/>
									);
								}
								return (
									<MessageItem
										avatar={arr[0].sender[0].avatar[0].path}
										fullName={fullName}
										listMessage={arr}
										key={arr[0]._id}
									/>
								);
							}
							if (arr[0].sender[0]._id === infoUser._id) {
								return (
									<MessageItem
										avatar={arr[0].sender[0].avatar[0].path}
										isRight
										fullName={fullName}
										message={arr[0]}
										key={arr[0]._id}
									/>
								);
							}
							return (
								<MessageItem
									avatar={arr[0].sender[0].avatar[0].path}
									fullName={fullName}
									message={arr[0]}
									key={arr[0]._id}
								/>
							);
						})}
					</div>
				</div>
			</ScrollToBottom>
			<MessageFooter conversationOpen={conversationId} />
		</div>
	);
}

const mapStateToProps = (state) => ({
	conversationOpen: state.conversations.conversationOpen,
	conversations: state.conversations.conversations,
	loadingConversation: state.conversations.loadingConversation,
	messages: state.messages.messages,
	loadingMessage: state.messages.loadingMessage,
	isConnecting: state.socket.isConnecting,
});

export default connect(mapStateToProps)(Messages);
