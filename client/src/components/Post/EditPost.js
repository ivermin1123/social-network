import React, { useState, useRef } from "react";
import { Avatar, notification, Button } from "antd";
import { useDispatch } from "react-redux";
import ContentEditable from "react-contenteditable";
import img5 from "../../assets/image/avatar-5.png";

import postActions from "../../actions/post.actions";
import LINK_CONSTANT from "../../constants/link.constants";

function EditPost(props) {
	const { post, fullName, setVisible, setDescription } = props;
	const dispatch = useDispatch();
	const postInput = useRef(null);
	const [value, setValue] = useState(post.description);

	const handleEdit = () => {
		if (value === post.description) {
			notification.success({
				message: "Cập nhật thành công",
				// description: "Bài viết đã được xóa.",
			});
		} else {
			dispatch(
				postActions.editPost({ postId: post._id, description: value })
			)
				.then(() => {
					notification.success({
						message: "Cập nhật thành công",
						// description: "Bài viết đã được xóa.",
					});
					setDescription(value);
				})
				.catch(() => {
					notification.error({
						message: "Đã xảy ra lỗi!!",
						// description: "Bài viết đã được xóa.",
					});
				});
		}
		setVisible(false);
	};

	return (
		<div className="edit-post">
			<div className="edit-post__header">
				<div className="edit-post__header--left">
					<Avatar
						size={40}
						src={
							post.author[0].avatar.length
								? `${LINK_CONSTANT.LINK_S3}${post.author[0].avatar[0].path}`
								: img5
						}
					/>
				</div>
				<div className="edit-post__header--right">
					<span> {fullName} </span>
				</div>
			</div>
			<ContentEditable
				innerRef={postInput}
				html={value}
				disabled={false}
				onChange={(e) => setValue(e.target.value)}
				tagName="article"
				className="edit-post__body"
			/>
			<Button type="primary" block onClick={handleEdit}>
				Cập nhật
			</Button>
		</div>
	);
}

export default EditPost;
