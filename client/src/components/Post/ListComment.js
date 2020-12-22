import React, { createElement, useState } from "react";
import { Comment, Tooltip, Avatar, Dropdown } from "antd";
import moment from "moment";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import commentActions from "../../actions/comment.actions";
import LINK_CONSTANT from "../../constants/link.constants";
import ButtonSVG from "../ButtonSVG";

import MenuOptionComment from "./MenuOptionComment";

function ListComment(props) {
	const { user, post: postO } = props;
	const dispatch = useDispatch();
	const [likes, setLikes] = useState(0);
	const [action, setAction] = useState(null);
	const [post, setPost] = useState(postO);
	const like = () => {
		setLikes(1);
		setAction("liked");
	};

	const actions = [
		<Tooltip key="comment-basic-like" title="Like">
			<span onClick={like}>
				{createElement(action === "liked" ? LikeFilled : LikeOutlined)}
				<span className="comment-action">{likes}</span>
			</span>
		</Tooltip>,
		<span key="comment-basic-reply-to">Reply</span>,
	];

	const InputComment = (props) => {
		const { parent } = props;
		const [message, setMessage] = useState("");
		const handleSubmit = (e) => {
			e.preventDefault();
			const dataSendServer = parent
				? { postId: post._id, parent, content: message }
				: { postId: post._id, content: message };
			dispatch(commentActions.commentOnPost(dataSendServer)).then(
				(data) => {
					setPost(data[0]);
				}
			);
			setMessage("");
		};
		return (
			<div className="editor-comment">
				<span className="editor-avatar">
					<Avatar
						src={`${LINK_CONSTANT.LINK_S3}${user.avatar[0].path}`}
						size={32}
						style={{ border: "0.3px solid gray" }}
					/>
				</span>
				<div className="editor__wrap">
					<div className="editor__body">
						<div className="editor__field">
							<form onSubmit={handleSubmit}>
								<input
									className="editor__textarea"
									type="text"
									name="message"
									placeholder="Viết bình luận..."
									onChange={(e) => setMessage(e.target.value)}
									value={message}
									required
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	};

	const DropDownOption = (props) => {
		// const [optionShow, setOptionShow] = useState(false);
		const { comment } = props;
		return (
			<Dropdown
				overlay={
					<MenuOptionComment
						setPost={setPost}
						post={post}
						comment={comment}
					/>
				}
				placement="bottomRight"
				// visible={optionShow}
				// onClick={() => setOptionShow(!optionShow)}
			>
				<a
					className="ant-dropdown-link"
					onClick={(e) => e.preventDefault()}
				>
					<ButtonSVG
						icon="icon-menu"
						// onClick={() => setOption(!option)}
					/>
				</a>
			</Dropdown>
		);
	};

	return (
		<div className="comment-area">
			<InputComment />
			{(post.comments.length &&
				post.comments.map((comment) => (
					<div className="comment-area__body" key={comment._id}>
						<div className="comment-area__body--left">
							<Comment
								key={comment._id}
								actions={actions}
								author={
									<span style={{ fontWeight: "bold" }}>
										{`${comment.author[0].firstName} ${comment.author[0].lastName}`}
									</span>
								}
								avatar={
									<span>
										<Avatar
											src={`${LINK_CONSTANT.LINK_S3}${comment.author[0].avatar[0].path}`}
											alt={`${comment.author[0].firstName} ${comment.author[0].lastName}`}
											size={32}
											style={{
												border: "0.3px solid gray",
											}}
										/>
									</span>
								}
								content={<span>{comment.content}</span>}
								datetime={
									<Tooltip
										title={moment(comment.createdAt)
											.locale("vi")
											.format(
												"dddd[,] DD [Tháng] MM [,] YYYY [lúc] HH:mm"
											)}
									>
										<span>
											{moment(comment.createdAt)
												.locale("vi")
												.fromNow()}
										</span>
									</Tooltip>
								}
							/>
						</div>
						<div className="comment-area__body--right">
							<DropDownOption comment={comment} />
						</div>
					</div>
				))) ||
				null}
		</div>
	);
}

export default ListComment;
