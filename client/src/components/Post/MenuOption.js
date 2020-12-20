import React from "react";
import { Modal, Menu } from "antd";
import {
	DeleteOutlined,
	EditOutlined,
	ExclamationCircleOutlined,
} from "@ant-design/icons";

function MenuOption(props) {
	const { clickFunc, setVisible } = props;
	const handleDeletePost = () => {
		Modal.confirm({
			getContainer: false,
			className: "modal-confirm-delete",
			title: "Xác nhận",
			icon: <ExclamationCircleOutlined />,
			content: "Bạn có chắc chắn muốn xóa bài viết này?",
			okText: "OK",
			cancelText: "Cancel",
		});
	};

	return (
		<Menu onClick={() => clickFunc(false)}>
			<Menu.Item icon={<DeleteOutlined />} onClick={handleDeletePost}>
				Xóa bài viết
			</Menu.Item>
			<Menu.Item icon={<EditOutlined />} onClick={() => setVisible(true)}>
				Sửa bài viết
			</Menu.Item>
		</Menu>
	);
}

export default MenuOption;
