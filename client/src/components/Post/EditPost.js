import React, { useState, useRef } from "react";
import { Avatar } from "antd";
import ContentEditable from "react-contenteditable";
import img5 from "../../assets/image/avatar-5.png";

import LINK_CONSTANT from "../../constants/link.constants";

function EditPost(props) {
	const { post } = props;
	const postInput = useRef(null);
	const [value, setValue] = useState(post.description);

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
					<span>Quốc Hoàng</span>
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
			{/* <div ref={postInput} className="edit-post__body" contentEditable>
				{post.description}
			</div> */}
		</div>
	);
}

export default EditPost;
