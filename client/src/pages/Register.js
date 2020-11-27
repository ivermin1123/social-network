import React from "react";
import Field from "../components/Field";

const Register = () => {
    const handleSubmit = () => {};
    return (
        <div className="register">
            <form className="content" onSubmit={handleSubmit}>
                <div className="logo field">
                    <h3>LOGO</h3>
                </div>
                <Field label="Tên đăng nhập" name="username" />
                <div className="row mb-3">
                    <div className="col-6">
                        <Field label="Họ" name="firstname" />
                    </div>
                    <div className="col-6">
                        <Field label="Tên" name="lastname" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-6">
                        <p className="label">
                            Giới tính <sup>*</sup>
                        </p>
                        <select className="field">
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                        </select>
                    </div>
                    <div className="col-6">
                        <Field label="Ngày sinh" name="birthday" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-6">
                        <Field label="Số điện thoại" name="phone" />
                    </div>
                    <div className="col-6">
                        <Field label="Email" name="email" />
                    </div>
                </div>
                <Field label="Mật khẩu" name="password" password />
                <Field label="Nhập lại mật khẩu" name="rêpat" password />
                <button className="btn-form" type="submit">
                    ĐĂNG KÝ
                </button>
            </form>
        </div>
    );
};
export default Register;
