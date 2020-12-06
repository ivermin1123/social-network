import React from "react";
import Smile from "../../../Icons/Smile";
import Picture from "../../../Icons/Picture";

export default function Footer(props) {
	const { callback } = props;
	const { sendMsg, setMsg, msg } = callback;

	return (
		<div className="col-foot">
			<div className="compose">
				<form onSubmit={sendMsg}>
					<input
						placeholder="Type a message"
						onChange={(e) => setMsg(e.target.value)}
						value={msg}
						required
					/>
				</form>

				<div className="compose-dock">
					<div className="dock">
						<Smile />
						<Picture />
					</div>
				</div>
			</div>
		</div>
	);
}
