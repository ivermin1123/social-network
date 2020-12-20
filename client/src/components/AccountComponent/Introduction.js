import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Theme } from "../../constants/index";

const Introduction = ({ ...props }) => {
	const { display, userData } = props;
	return (
		<div style={{ display: display || "none" }}>
			<div className="intro">
				<div className="intro-field">
					<div className="intro-field-header">
						<h5>Thông tin liên hệ</h5>
					</div>
					{userData.phone ? (
						<div className="intro-field-row">
							<div className="intro-field-row__col">
								<div className="intro-field-row__col-icon">
									<FontAwesomeIcon
										className="icon"
										icon={Theme.ICONS.phone}
									/>
								</div>
							</div>
							<div className="intro-field-row__col">
								<div className="intro-field-row__col-value">
									{userData.phone}
								</div>
								<div className="intro-field-row__col-title">
									Di động
								</div>
							</div>
						</div>
					) : null}
					{userData.email ? (
						<div className="intro-field-row">
							<div className="intro-field-row__col">
								<div className="intro-field-row__col-icon">
									<FontAwesomeIcon
										className="icon"
										icon={Theme.ICONS.envelope}
									/>
								</div>
							</div>
							<div className="intro-field-row__col">
								<div className="intro-field-row__col-value">
									{userData.email}
								</div>
								<div className="intro-field-row__col-title">
									Email
								</div>
							</div>
						</div>
					) : null}
				</div>
			</div>
			<div className="intro-field">
				<div className="intro-field-header">
					<h5>Thông tin cơ bản</h5>
				</div>
				{userData.gender ? (
					<div className="intro-field-row">
						<div className="intro-field-row__col">
							<div className="intro-field-row__col-icon">
								<FontAwesomeIcon
									className="icon"
									icon={Theme.ICONS.transgenderAlt}
								/>
							</div>
						</div>
						<div className="intro-field-row__col">
							<div className="intro-field-row__col-value">
								{userData.gender === 0 ? "Nam" : "Nữ"}
							</div>
							<div className="intro-field-row__col-title">
								Giới tính
							</div>
						</div>
					</div>
				) : null}
				{userData.birthday ? (
					<div className="intro-field-row">
						<div className="intro-field-row__col">
							<div className="intro-field-row__col-icon">
								<FontAwesomeIcon
									className="icon"
									icon={Theme.ICONS.birthday}
								/>
							</div>
						</div>
						<div className="intro-field-row__col">
							<div className="intro-field-row__col-value">
								{userData.birthday}
							</div>
							<div className="intro-field-row__col-title">
								Ngày sinh
							</div>
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default Introduction;
