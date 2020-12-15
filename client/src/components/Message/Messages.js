import React, { useEffect } from "react";
import { useDispatch, connect, useSelector } from "react-redux";
import moment from "moment";
import { Tooltip } from "antd";

import ScrollToBottom from "react-scroll-to-bottom";
import ButtonSVG from "../ButtonSVG";
import avatar1 from "../../assets/image/ava-1.png";
import messageActions from "../../actions/message.actions";
import "react-perfect-scrollbar/dist/css/styles.css";

function checkTime(mess1, mess2) {
	const time1m = moment(mess1.createdAt).unix();
	const time2m = moment(mess2.createdAt).unix();

	const date = new Date(Math.abs(time1m - time2m) * 1000);
	const minutes = date.getMinutes();
	if (minutes > 2 || mess1.sender._id !== mess2.sender._id) {
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
			arrToShow.push(arr);
		} else {
			const result = checkTime(
				arrToCalculator[i],
				arrToCalculator[i + 1]
			);
			if (!result) {
				arrToShow.push(arr);
				arr = [];
			}
		}
	}
	return arrToShow;
}

function Messages(props) {
	const {
		messages,
		conversationOpen,
		isConnecting,
		loadingMessage,
		conversations,
		loadingConversation,
	} = props;
	const dispatch = useDispatch();
	const { infoUser } = useSelector((state) => state.users);
	const { socket } = useSelector((state) => state.socket);

	useEffect(() => {
		dispatch(messageActions.getMessages(conversationOpen.id));
		if (isConnecting) {
			socket.emit("CSS_JOIN", {
				name: `${infoUser.username}`,
				room: conversationOpen.id,
			});
		}
	}, []);

	let arrToShow = [];
	if (!loadingMessage) {
		arrToShow = dataToShow(messages.data.reverse());
	}

	let conversationName;
	if (!loadingConversation) {
		const conversation = conversations.data.filter(
			(conversation) => conversation._id === conversationOpen.id
		);
		conversationName = conversation[0].name;
		if (conversation[0].members.length === 2) {
			conversation[0].members.forEach((member) => {
				if (member._id !== infoUser._id) {
					conversationName = `${member.firstName} ${member.lastName}`;
				}
			});
		}
	}

	const MessageAction = () => {
		return (
			<div className="messages__actions">
				{/* <div className="messages__time">🔥 {time}</div> */}
				<ButtonSVG classN="messages__action" icon="icon-smile" />
				<ButtonSVG classN="messages__action" icon="icon-bookmarks" />
				<ButtonSVG classN="messages__action" icon="icon-menu" />
			</div>
		);
	};

	const MessageItem = (props) => {
		const { message, listMessage, isRight, fullName } = props;
		return (
			<div className={`messages__item${isRight ? "_right" : ""}`}>
				{isRight ? null : (
					<div className="messages__ava">
						<img className="messages__pic" src={avatar1} alt="" />
					</div>
				)}
				<div className="messages__details">
					<div className="messages__head">
						<div className="messages__man">{fullName}</div>
						{/* <div className="messages__time">🔥 3m ago</div> */}
					</div>
					<div className="messages__body">
						{listMessage ? (
							listMessage.map((message) => (
								<Tooltip
									title={moment(message.createdAt)
										.locale("vi")
										.fromNow()}
									placement={isRight ? "right" : "left"}
								>
									<div
										className={`messages__text${
											isRight ? "_right" : ""
										}`}
										key={message._id}
									>
										{message.content}
										<MessageAction />
									</div>
								</Tooltip>
							))
						) : (
							<Tooltip
								title={moment(message.createdAt)
									.locale("vi")
									.fromNow()}
								placement={isRight ? "right" : "left"}
							>
								<div
									className={`messages__text${
										isRight ? "_right" : ""
									}`}
								>
									{message.content}
									<MessageAction />
								</div>
							</Tooltip>
						)}
					</div>
				</div>
				{isRight ? (
					<div className="messages__ava">
						<img className="messages__pic" src={avatar1} alt="" />
					</div>
				) : null}
			</div>
		);
	};

	const pasteAsPlainText = (event) => {
		event.preventDefault();

		const text = event.clipboardData.getData("text/plain");
		document.execCommand("insertHTML", false, text);
	};

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
							const fullName = `${arr[0].sender.firstName} ${arr[0].sender.lastName}`;
							if (arr.length > 1) {
								if (arr[0].sender._id === infoUser._id) {
									return (
										<MessageItem
											listMessage={arr}
											isRight
											fullName={fullName}
											key={arr[0]._id}
										/>
									);
								}
								return (
									<MessageItem
										fullName={fullName}
										listMessage={arr}
										key={arr[0]._id}
									/>
								);
							}
							if (arr[0].sender._id === infoUser._id) {
								return (
									<MessageItem
										isRight
										fullName={fullName}
										message={arr[0]}
										key={arr[0]._id}
									/>
								);
							}
							return (
								<MessageItem
									fullName={fullName}
									message={arr[0]}
									key={arr[0]._id}
								/>
							);
						})}
					</div>
				</div>
			</ScrollToBottom>
			<div className="editor">
				<div className="editor__wrap">
					<div className="editor__body">
						<div className="editor__field">
							<p
								className="editor__textarea"
								contentEditable="true"
								placeholder="text ..."
								onPaste={pasteAsPlainText}
							/>
						</div>
					</div>
				</div>
			</div>
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
