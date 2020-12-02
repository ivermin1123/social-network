import React, { useState } from "react";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import Modal from "react-bootstrap/Modal";

const PostForm = ({ ...props }) => {
	const [setState] = useState();
	const [show, setShow] = useState(false);
	const [file] = useState(null);

	const handleFile = (e) => {
		let file = e.target.files[0];
		setState(file);
	};
	return (
		<>
			<div className="post-form">
				<div className="post-form-top">
					<img
						src="https://kenh14cdn.com/thumb_w/660/2020/1/19/280014414259784478324811019039941n-15794066996821910883374.jpg"
						alt=""
						className="post-form-top__avt"
					/>
					<button
						className="post-form-top__btn"
						onClick={() => setShow(true)}
					>
						Bạn mình ơi, bạn đang nghĩ gì vậy nè?
					</button>
				</div>
				<div className="post-form-bot">
					<button className="post-form-bot__btn">Anh</button>
					<button className="post-form-bot__btn">Tú</button>
					<button className="post-form-bot__btn">Nguyễn</button>
				</div>
			</div>
			<Modal
				{...props}
				dialogClassName="post-form-modal"
				centered
				animation={false}
				show={show}
				onHide={() => setShow(false)}
			>
				<Modal.Header bsPrefix="post-form-modal__header" closeButton>
					<Modal.Title bsPrefix="post-form-modal__header-title">
						Tạo bài viết
					</Modal.Title>
				</Modal.Header>
				<Modal.Body bsPrefix="post-form-modal__body">
					<img
						src="https://i.pinimg.com/736x/d3/63/54/d363546caad6e492a4921549f174ae5d.jpg"
						alt=""
						className="post-form-modal__body--avt"
					/>
					<span className="post-form-modal__body--author">
						Tu Nguyen
					</span>
					<br />
					<textarea
						type="text"
						autoFocus
						className="post-form-modal__body--content"
						placeholder="Bạn mình ơi, bạn đang nghĩ gì vậy nè"
					/>
					<div className="post-form-modal__footer">
						<input
							type="file"
							name="file"
							onChange={(e) => handleFile(e)}
						/>
					</div>
					{/* <button type="submit">Đăng</button> */}
				</Modal.Body>
			</Modal>
		</>
	);
};

export default PostForm;
