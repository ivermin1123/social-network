import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import SlideToggle from "react-slide-toggle";

import conversationActions from "../../actions/conversation.actions";
import ConversationItem from "./ConversationItem";

function SideBar() {
	const [searchCon, setSearchCon] = useState("");
	const [isActive, setActive] = useState(true);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(conversationActions.getListConversations());
	}, []);

	// const { conversations } = props;

	const handleActive = () => {
		setActive(!isActive);
	};
	return (
		<div className="chat__sidebar">
			<SlideToggle>
				{({ toggle, setCollapsibleElement }) => (
					<div className={`chat__item${isActive ? " active" : ""}`}>
						<div
							className="chat__head"
							onClick={() => {
								toggle();
								handleActive();
							}}
						>
							Chat
						</div>
						<div
							className="chat__body"
							style={{ display: "block" }}
							ref={setCollapsibleElement}
						>
							<label className="search-label" htmlFor="search">
								<input
									name="search"
									autoComplete="off"
									className="search-conversations"
									placeholder="Tìm kiếm trên Messenger"
									spellCheck="false"
									type="text"
									aria-label="Tìm kiếm trên Messenger"
									onChange={(e) =>
										setSearchCon(e.target.value)
									}
									value={searchCon}
								/>
							</label>
							<ConversationItem />
							<ConversationItem />
						</div>
					</div>
				)}
			</SlideToggle>
		</div>
	);
}

const mapStateToProps = (state) => ({
	conversations: state.conversations.conversations,
});

export default connect(mapStateToProps)(SideBar);
