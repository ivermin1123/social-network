import React, { useState } from "react";
// import ModalHeader from "react-bootstrap/esm/ModalHeader";
import Modal from "react-bootstrap/Modal";

const PostForm = ({ ...props }) => {
	const [show, setShow] = useState(false);
	const [file, setFile] = useState(null);

	const handleFile = (e) => {
		const { files } = e.target;
		setFile(URL.createObjectURL(files[0]));
	};

	const handleClick = () => {
		// setFile(null);
	};

	return (
		<>
			<div className="post-form">
				<div className="post-form-top">
					<img
						src="https://i.pinimg.com/736x/ae/c4/53/aec453161b2f33ffc6219d8a758307a9.jpg"
						alt=""
						className="post-form-top__avt"
					/>
					<button
						type="button"
						className="post-form-top__btn"
						onClick={() => setShow(true)}
					>
						Bạn mình ơi, bạn hang nghĩ gì vậy nè?
					</button>
				</div>
				<div className="post-form-bot">
					<button type="button" className="post-form-bot__btn">
						Anh
					</button>
					<button type="button" className="post-form-bot__btn">
						Tú
					</button>
					<button type="button" className="post-form-bot__btn">
						Nguyễn
					</button>
				</div>
			</div>
			<Modal
				{...props}
				dialogClassName="post-form-modal"
				centered
				animation={false}
				show={show}
				onHide={() => setShow(false)}
				onClick={handleClick}
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
					<img src={file} alt="" className="post-form-top__avt" />
					{/* <button type="submit">Đăng</button> */}
				</Modal.Body>
			</Modal>
		</>
	);
};

export default PostForm;
