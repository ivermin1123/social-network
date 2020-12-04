import React from "react";
import img3 from "../../../assets/image/avatar-3.png";

export default function RightBar() {
	return (
		<div className="col-right">
			<div className="col-content">
				<div className="user-panel">
					<div className="avatar">
						<div className="avatar-image">
							<div className="status online" />
							<img alt="avatar" src={img3} />
						</div>

						<h3>Vy</h3>
						<p>London, United Kingdom</p>
					</div>
				</div>
			</div>
		</div>
	);
}
