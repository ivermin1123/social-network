import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { Modal, Avatar } from "antd";

import { Theme } from "../../constants/index";
import img5 from "../../assets/image/avatar-5.png";

import PostReactionDisplay from "./PostReactionDisplay";
import PostReaction from "./PostReaction";
import ListReactions from "./ListReactions";
import ListComment from "./ListComment";
import LINK_CONSTANT from "../../constants/link.constants";

const Post = (props) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [showComment, setShowComment] = useState(false);

	const { post } = props;
	const [postN, setPostN] = useState(post);

	return (
		<div className="post">
			<div className="post-header">
				<Avatar
					size={40}
					className="post-header__avt"
					src={
						postN.author[0].avatar.length
							? `${LINK_CONSTANT.LINK_S3}${postN.author[0].avatar[0].path}`
							: img5
					}
				/>
				<div className="post-header__name">{`${postN.author[0].firstName} ${postN.author[0].lastName}`}</div>
				<div className="post-header__created">
					{moment(postN.createdAt).locale("vi").fromNow()}
				</div>
			</div>

			<div className="post-body">
				<div className="post-body__content">{postN.description}</div>
				<img
					src={
						postN.files.length
							? `${LINK_CONSTANT.LINK_S3}${postN.files[0].path}`
							: null
					}
					alt=""
					className="post-body__image"
				/>
				<div className="post-body__react">
					<PostReactionDisplay
						post={postN}
						onClick={setIsModalVisible}
					/>
					<div className="post-body__react--comments">
						{postN.comments.length
							? `${postN.comments.lenght} bình luận`
							: null}
					</div>
				</div>

				<div className="post-body__interact">
					<PostReaction postN={postN} setPostN={setPostN} />
					<div className="post-body__interact-option comments">
						<button
							type="button"
							onClick={() => setShowComment(true)}
						>
							<FontAwesomeIcon
								className="icon"
								style={{ marginRight: "6px" }}
								icon={Theme.ICONS.commentAlt}
							/>
							<span>Comment</span>
						</button>
					</div>
					{/* <CommentButton/> */}
				</div>
				<ListComment
					showComment={showComment}
					style={{ display: "none" }}
				/>
			</div>
			<Modal
				title="Danh sách lượt thích"
				visible={isModalVisible}
				footer={null}
				width="fit-content"
				onCancel={() => setIsModalVisible(false)}
				headStyle={{ borderRadius: "10px 10px 0 0" }}
				style={{ borderRadius: "10px" }}
			>
				<ListReactions postN={postN} />
			</Modal>
		</div>
	);
};

export default Post;
