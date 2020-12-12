import React from "react";
import { FormLeft } from "../components/_components";

const Login = () => {
	return (
		<div
			className="login"
			style={{ backgroundImage: "img/bg-sign-in.png" }}
		>
			<div className="login__container">
				<FormLeft />
				<div className="login__form">
					<a className="login__close mobile-hide" href="index.html">
						<svg className="icon icon-remove">
							{/* <a href="img/sprite.svg#icon-remove" /> */}
						</svg>
					</a>
					<div className="login__title h3">Đăng nhập</div>
					<div className="login__line">
						<div className="login__text">Người dùng mới?</div>
						<a className="login__link" href="/register">
							Tạo tài khoản
						</a>
					</div>
					<div className="field">
						<div className="field__label">
							Tên đăng nhập hoặc mật khẩu
						</div>
						<div className="field__wrap">
							<input
								className="field__input"
								type="email"
								placeholder="Nhập tên đăng nhập hoặc email ..."
							/>
						</div>
					</div>
					<div className="field">
						<div className="field__label">Mật khẩu</div>
						<div className="field__wrap">
							<input
								className="field__input"
								type="password"
								placeholder="Nhập mật khẩu ..."
							/>
						</div>
					</div>
					<button
						className="login__btn btn btn_purple btn_wide"
						type="button"
					>
						Tiếp tục
					</button>
					<div className="login__or">Hoặc tiếp tục với</div>
					<button
						className="login__btn btn btn_blue btn_wide"
						type="button"
					>
						Google
					</button>
				</div>
			</div>
		</div>
	);
};
export default Login;
