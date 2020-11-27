import React from "react";
import Field from "../components/Field";

const Register = () => {
    return (
        <div className="register">
            <form className="content">
                <div className="logo field">
                    <h3>LOGO</h3>
                </div>
                <div className="row">
                    <Field label="Họ" name="firstname" />
                    <Field label="Tên" name="lastname" />
                </div>
                <div className="row">
                    <select>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                    </select>
                </div>
                <Field label="Mật khẩu" name="password" password />
                <div className="field">
                    <input type="checkbox" name="save" />
                    Nhớ mật khẩu
                    <a className="mt-0">Quên mật khẩu</a>
                </div>
                <button className="btn-form" type="submit">
                    ĐĂNG KÝ
                </button>
            </form>
        </div>
    );
};
export default Register;
