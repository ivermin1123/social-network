import React from "react";
import { Modal, Menu, notification } from "antd";
import { useDispatch } from "react-redux";
import {
	DeleteOutlined,
	EditOutlined,
	ExclamationCircleOutlined,
} from "@ant-design/icons";

import commentActions from "../../actions/comment.actions";

function MenuOptionComment(props) {
	const { setPost, post, comment } = props;
	const dispatch = useDispatch();
	const deleteComment = () => {
		dispatch(
			commentActions.deleteComment({
				commentId: comment._id,
				postId: post._id,
			})
		).then((data) => {
			notification.success({
				message: "Bình luận đã được xóa.",
				// description: "Bài viết đã được xóa.",
			});
			setPost(data[0]);
		});
	};
	const handleDeleteComment = () => {
		Modal.confirm({
			getContainer: false,
			className: "modal-confirm-delete",
			title: "Xác nhận",
			icon: <ExclamationCircleOutlined />,
			content: "Bạn có chắc chắn muốn xóa bình luận này?",
			okText: "OK",
			cancelText: "Cancel",
			onOk: deleteComment,
		});
	};

	return (
		<Menu
			// onClick={() => clickFunc(false)}
			style={{ boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 4px 0px" }}
		>
			<Menu.Item icon={<DeleteOutlined />} onClick={handleDeleteComment}>
				Xóa bình luận
			</Menu.Item>
			{/* <Menu.Item icon={<EditOutlined />}>Sửa bình luận</Menu.Item> */}
		</Menu>
	);
}

export default MenuOptionComment;
