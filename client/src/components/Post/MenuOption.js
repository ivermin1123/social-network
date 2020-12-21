import React from "react";
import { Modal, Menu, notification } from "antd";
import { useDispatch } from "react-redux";
import {
	DeleteOutlined,
	EditOutlined,
	ExclamationCircleOutlined,
} from "@ant-design/icons";

import postActions from "../../actions/post.actions";

function MenuOption(props) {
	const { clickFunc, setVisible, post, user } = props;
	const dispatch = useDispatch();
	const deletePost = () => {
		dispatch(
			postActions.deletePost({ userId: user._id, postId: post._id })
		).then(() => {
			notification.success({
				message: "Bài viết đã được xóa.",
				// description: "Bài viết đã được xóa.",
			});
		});
	};
	const handleDeletePost = () => {
		Modal.confirm({
			getContainer: false,
			className: "modal-confirm-delete",
			title: "Xác nhận",
			icon: <ExclamationCircleOutlined />,
			content: "Bạn có chắc chắn muốn xóa bài viết này?",
			okText: "OK",
			cancelText: "Cancel",
			onOk: deletePost,
		});
	};

	return (
		<Menu
			onClick={() => clickFunc(false)}
			style={{ boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 4px 0px" }}
		>
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
