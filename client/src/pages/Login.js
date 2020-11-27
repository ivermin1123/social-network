import React from "react";
import Field from "../components/Field";

import "../scss/_form.scss";
const Login = () => {
    const handleSubmit = (username) =>{
        console.log(username);
    }
    return (
        <div className="row login">
            <div className="col-md-5 col-xs-12 side-left">
                <img src="../assets/image/imageLogin.jpg" alt="cat"/>
            </div>
            <div className="col-md-7 col-xs-12 side-right">
                <div className="side-right-top">
                    <form className='content' onSubmit={handleSubmit}>
                        <div className="logo field">
                            <h3>LOGO</h3>
                        </div>
                        <Field label='Tên đăng nhập' name='username'/>
                        <Field label='Mật khẩu' name='password' password/>
                        <div className="field">
                            <input type="checkbox" name="save" />
                            Nhớ mật khẩu
                            <a className="mt-0">Quên mật khẩu</a>
                        </div>
                        <button className="btn-form" type="submit">
                            ĐĂNG NHẬP
                        </button>
                    </form>
                </div>
                <div className="side-right-bottom">
                    <div className='content'>
                        <div>
                            <p>Bạn chưa có tài khoản?</p>
                            <a> Đăng ký ngay</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
