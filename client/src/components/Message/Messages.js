import React, { useEffect } from "react";
import { useDispatch, connect, useSelector } from "react-redux";
import moment from "moment";

import ScrollToBottom from "react-scroll-to-bottom";
import MessageItem from "./MessageItem";
import ButtonSVG from "../ButtonSVG";
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
	return arrToShow.reverse();
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
		arrToShow = dataToShow(messages.data);
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
								data-ph="Nhập tin nhắn"
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
