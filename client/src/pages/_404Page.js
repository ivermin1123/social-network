import React from "react";
import { Link } from "react-router-dom";
import { Result } from "antd";

function _404Page() {
	return (
		<Result
			status="404"
			title="404"
			subTitle="Xin lỗi, trang bạn vừa vào không tồn tại."
			extra={
				<Link to="/" className="btn btn-primary">
					Trở về trang chủ
				</Link>
			}
		/>
	);
}

export default _404Page;
