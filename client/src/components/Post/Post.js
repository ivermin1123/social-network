import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { Modal, Avatar, Dropdown } from "antd";
import FbImageLibrary from "react-fb-image-grid";

import { Theme } from "../../constants/index";
import img5 from "../../assets/image/avatar-5.png";
import ButtonSVG from "../ButtonSVG";
import PostReactionDisplay from "./PostReactionDisplay";
import PostReaction from "./PostReaction";
import ListReactions from "./ListReactions";
import MenuOption from "./MenuOption";
import ListComment from "./ListComment";
import EditPost from "./EditPost";
import LINK_CONSTANT from "../../constants/link.constants";

const Post = (props) => {
	const { infoUser } = useSelector((state) => state.users);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [showComment, setShowComment] = useState(false);
	const [optionShow, setOptionShow] = useState(false);
	const [visible, setVisible] = useState(false);

	const { post } = props;
	const [postN, setPostN] = useState(post);
	const fullName = `${postN.author[0].firstName} ${postN.author[0].lastName}`;
	const timePost = { time: null, isEdit: false };
	if (postN.isUpdated === true) {
		timePost.time = moment(postN.createdAt).locale("vi").fromNow();
		timePost.isEdit = true;
	} else {
		timePost.time = moment(postN.createdAt).locale("vi").fromNow();
	}

	const imageArray = [];
	postN.files.forEach((file) => {
		imageArray.push(`${LINK_CONSTANT.LINK_S3}${file.path}`);
	});
	return postN && postN.author ? (
		<div className="post">
			<div className="post-header">
				<div className="post-header__left">
					<Avatar
						size={40}
						className="post-header__avt"
						src={
							postN.author[0].avatar.length
								? `${LINK_CONSTANT.LINK_S3}${postN.author[0].avatar[0].path}`
								: img5
						}
					/>
					<div className="post-header__name">
						<Link to={`account/${postN.author[0]._id}`}>
							<span>{fullName}</span>
						</Link>
					</div>
					<div className="post-header__created">
						{timePost.time}{" "}
						{postN.isUpdated === true ? "(Edited)" : null}
					</div>
				</div>
				{postN.author[0]._id === infoUser._id ? (
					<div className="post-header__right">
						<Dropdown
							overlay={
								<MenuOption
									clickFunc={setOptionShow}
									setVisible={setVisible}
									post={postN}
									user={infoUser}
								/>
							}
							placement="bottomRight"
							visible={optionShow}
							onClick={() => setOptionShow(!optionShow)}
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
					</div>
				) : null}
			</div>

			<div className="post-body">
				<div className="post-body__content">
					<span
						dangerouslySetInnerHTML={{
							__html: postN.description,
						}}
					/>
				</div>
				<FbImageLibrary images={imageArray} hideOverlay />
				<div className="post-body__react">
					<PostReactionDisplay
						post={postN}
						onClick={setIsModalVisible}
					/>
					<div className="post-body__react--comments">
						{postN.comments.length
							? `${postN.comments.length} bình luận`
							: null}
					</div>
				</div>

				<div className="post-body__interact">
					<PostReaction postN={postN} setPostN={setPostN} />
					<div
						className="post-body__interact-option comments"
						onClick={() => setShowComment(!showComment)}
					>
						<button type="button">
							<FontAwesomeIcon
								className="icon"
								style={{ marginRight: "6px" }}
								icon={Theme.ICONS.commentAlt}
							/>
							<span>Comment</span>
						</button>
					</div>
				</div>

				{showComment && <ListComment post={postN} user={infoUser} />}
			</div>
			<Modal
				// title="Danh sách lượt thích"
				className="list-reactions-modal"
				getContainer={false}
				visible={isModalVisible}
				footer={null}
				width="455px"
				closable={false}
				onCancel={() => setIsModalVisible(false)}
				headStyle={{ borderRadius: "10px 10px 0 0" }}
				style={{ borderRadius: "10px" }}
			>
				<ListReactions reactions={postN.reactions} />
			</Modal>
			<Modal
				className="modal-edit-post"
				title="Chỉnh sửa bài viết"
				getContainer={false}
				visible={visible}
				footer={null}
				maskClosable="true"
				onOk={() => setVisible(false)}
				onCancel={() => setVisible(false)}
			>
				<EditPost
					post={postN}
					fullName={fullName}
					setVisible={setVisible}
				/>
			</Modal>
		</div>
	) : null;
};

export default Post;
