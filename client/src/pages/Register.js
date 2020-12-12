import React from "react";
import { FormLeft } from "../components/_components";

const Register = () => {
	return (
		<div
			className="login"
			style={{ backgroundImage: "img/bg-sign-in.png" }}
		>
			<div className="login__container">
				<FormLeft />
				<div className="login__form">
					<a className="login__close" href="index.html">
						<svg className="icon icon-arrow-left">
							{/* <a href="img/sprite.svg#icon-arrow-left"></a> */}
						</svg>
					</a>
					<div className="login__title h3">Đăng ký</div>
					<div className="login__line">
						<div className="login__text">Bạn đã có tài khoản?</div>
						<a className="login__link" href="/login">
							Đăng nhập ngay
						</a>
					</div>
					<div className="login__row">
						<div className="login__col">
							<div className="field">
								<div className="field__label">Họ</div>
								<div className="field__wrap">
									<input
										className="field__input"
										type="text"
									/>
								</div>
							</div>
						</div>
						<div className="login__col">
							<div className="field">
								<div className="field__label">Tên</div>
								<div className="field__wrap">
									<input
										className="field__input"
										type="text"
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="login__row">
						<div className="login__col">
							<div className="field">
								<div className="field__label">Giới tính</div>
								<div className="field__wrap">
									<input
										className="field__input"
										type="text"
									/>
								</div>
							</div>
						</div>
						<div className="login__col">
							<div className="field">
								<div className="field__label">Ngày sinh</div>
								<div className="field__wrap">
									<input
										className="field__input"
										type="text"
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="field">
						<div className="field__label">Email</div>
						<div className="field__wrap">
							<input className="field__input" type="email" />
						</div>
					</div>
					<div className="field">
						<div className="field__label">Mật khẩu</div>
						<div className="field__wrap">
							<input className="field__input" type="password" />
						</div>
					</div>
					<button
						className="login__btn btn btn_purple btn_wide"
						type="button"
					>
						Tiếp tục
					</button>
					{/* <div className="login__or">Đăng ký bằng</div>
					<button
						className="login__btn btn btn_blue btn_wide"
						type="button"
					>
						Tài khoản Google
					</button> */}
				</div>
			</div>
		</div>
	);
};

export default Register;
