import React from "react";
import { FaRegWindowClose } from "react-icons/fa";

import img5 from "../../assets/image/avatar-5.png";

const ChatBox = (props) => {
	const { open, current, closeChat } = props;

	return (
		<>
			{open ? (
				<div className="chat">
					<div className="chat__header">
						<div className="chat__first">
							<div className="chat__header-img">
								<img
									src={current.image ? current.image : img5}
									alt="user"
								/>
							</div>
							<div className="chat__header-name">
								{`${current.firstName} ${current.lastName}`}
							</div>
						</div>
						<div className="chat__second">
							<FaRegWindowClose
								className="chat__header-icons"
								onClick={() => closeChat()}
							/>
						</div>
					</div>
					<div className="chat__body">
						<div className="chat__left">
							<p className="msg">Lorem, ipsum dolor sit amet</p>
						</div>
						<div className="chat__right">
							<p className="msg">Lorem, ipsum</p>
						</div>
						<div className="chat__left">
							<p className="msg">
								Lorem, ipsum dolor sit amet lskdjflkj sdfsdf sdf
							</p>
						</div>
						<div className="chat__right">
							<p className="msg">Lorem, ipsum sdd</p>
						</div>
					</div>
					<div className="chat__footer">
						<input
							type="text"
							className="chat__input"
							placeholder="Aa"
						/>
					</div>
				</div>
			) : (
				""
			)}
		</>
	);
};

export default ChatBox;
