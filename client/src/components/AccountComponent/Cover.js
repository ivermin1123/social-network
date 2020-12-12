import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-bootstrap/Modal";
import { Tabs, Theme } from "../../constants/index";
import { MAX_POST_IMAGE_SIZE } from "../../constants/ImageSize";
import userAction from "../../actions/user.actions";
import "react-toastify/dist/ReactToastify.css";

const configToast = {
	position: "top-right",
	autoClose: 1000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
};
const LINK_S3 = "https://socialawsbucket.s3-ap-southeast-1.amazonaws.com/";
const Cover = (props) => {
	const [sumFriend, setSumFriend] = useState(0);
	const [value, setValue] = useState("");
	const [status, setStatus] = useState(false);
	const [state, setState] = useState();
	const [popoverAvt, setPopoverAvt] = useState(false);
	const { infoUser } = useSelector((state) => state.users);

	const { firstName, lastName, avatar } = infoUser.data;
	const name = `${firstName} ${lastName}`;
	const avatarSrc = `${LINK_S3}${avatar.path}`;

	const [show, setShow] = useState(false);
	const [file, setFile] = useState(null);
	const [description, setDescription] = useState("");
	const dispatch = useDispatch();

	const handleAddProfile = () => {
		setStatus(!status);
	};
	const handleClickMenu = (value) => {
		setState(value);
	};
	useEffect(() => {
		setSumFriend(999);
	}, []);

	const handleReset = () => {
		setFile(null);
		setDescription("");
	};

	const handleFile = (e) => {
		const img = e.target.files[0];
		if (img && img.size >= MAX_POST_IMAGE_SIZE) {
			toast(
				`🦄 File size should be less then ${
					MAX_POST_IMAGE_SIZE / 1000000
				}MB`,
				configToast
			);
		}
		if (img && img) {
			setFile(img);
		}
	};
	const handleSave = (e) => {
		e.preventDefault();
		try {
			const data = { path: "user" };
			const dataSaveServer = {
				url: "USER_IMAGE",
				method: "POST",
				data: { description },
			};
			// Redux call
			dispatch(userAction.updateUserImage(file, data, dataSaveServer))
				.then((data) => {
					toast(`🦄 Upload Image Success`);
					console.log(data);
					handleReset();
					setShow(false);
				})
				.catch((err) => {
					toast(`🦄 Upload Image Fail`);
					handleReset();
					console.log(err);
				});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<div className="cover">
				<div className="cover-image">
					<img
						src="https://socialawsbucket.s3-ap-southeast-1.amazonaws.com/post/7740dd7c-dca0-4277-8303-0142e716c0e7.jpg"
						alt=""
						className="cover-image"
					/>
					<div className="avatar">
						<button
							type="button"
							className="show-avatar"
							onClick={() => setPopoverAvt(!popoverAvt)}
						>
							<img src={avatarSrc} alt="" />
							<button
								type="button"
								className="button__change-avatar"
							>
								<FontAwesomeIcon
									className="icon"
									icon={Theme.ICONS.camera}
								/>
							</button>
						</button>
					</div>
					<div
						className="option-avatar"
						style={{ display: popoverAvt ? "block" : "none" }}
					>
						<div className="option-item">
							<div className="item">
								<button type="button" className="item-value">
									<FontAwesomeIcon
										className="icon"
										icon={Theme.ICONS.portrait}
									/>
									Xem ảnh đại diện
								</button>
							</div>
							<div className="item">
								<button
									type="button"
									className="item-value"
									onClick={() => setShow(true)}
								>
									<FontAwesomeIcon
										className="icon"
										icon={Theme.ICONS.images}
									/>
									Cập nhật ảnh đại diện
								</button>
							</div>
						</div>
					</div>
					<div className="button__change-cover">
						<button type="button">
							<FontAwesomeIcon
								className="icon"
								icon={Theme.ICONS.camera}
							/>
							Chỉnh sửa ảnh bìa
						</button>
					</div>
				</div>
				<div className="cover-display">
					<div className="cover-display-content">
						<h1>{name}</h1>
						<button
							type="button"
							className="button__add-profile"
							style={{ display: status ? "none" : "block" }}
							onClick={handleAddProfile}
						>
							Thêm tiểu sử
						</button>
						<div
							className="cover-display-add"
							style={{ display: !status ? "none" : "block" }}
						>
							<textarea
								maxLength="101"
								rows="3"
								placeholder="Mô tả về bạn"
								value={value}
								onChange={(e) => {
									setValue(e.target.value);
								}}
							/>
							<div className="count-char">
								<span>Còn {101 - value.length} ký tự</span>
							</div>
							<div className="cover-bottom row">
								<div className="cover-bottom-left">
									<FontAwesomeIcon
										className="icon"
										icon={Theme.ICONS.globeAsia}
									/>
									<span>Công khai</span>
								</div>
								<div className="cover-bottom-right ">
									<button
										type="button"
										onClick={() => {
											handleAddProfile();
											setValue("");
										}}
									>
										Hủy
									</button>
									<button
										type="button"
										disabled={
											!(
												value.length > 0 &&
												value.length <= 101
											)
										}
										style={{
											cursor:
												value.length > 0 &&
												value.length <= 101
													? null
													: "not-allowed",
										}}
									>
										Lưu
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="cover-menu">
					<div className="menu-content row">
						<div className="menu-content-left">
							{Tabs.map((item, index) => {
								return (
									<button
										key={index.toString()}
										type="button"
										className={`menu-left-item ${
											state === index ? "active" : ""
										}`}
										onClick={(index) => {
											handleClickMenu(index);
										}}
									>
										<span>{item.displayName}</span>
										{item.name === "friends" ? (
											<span className="item-sumfriend">
												{sumFriend}
											</span>
										) : null}
									</button>
								);
							})}
						</div>
						<div className="menu-content-right">
							<button type="button">
								<FontAwesomeIcon
									className="icon"
									icon={Theme.ICONS.pen}
								/>
								<span>Chỉnh sửa trang ...</span>
							</button>
							<button type="button">
								<FontAwesomeIcon
									className="icon"
									icon={Theme.ICONS.eye}
								/>
							</button>
							<button type="button">
								<FontAwesomeIcon
									className="icon"
									icon={Theme.ICONS.search}
								/>
							</button>
							<button type="button">
								<FontAwesomeIcon
									className="icon"
									icon={Theme.ICONS.ellipsisH}
								/>
							</button>
						</div>
					</div>
				</div>
			</div>

			<Modal
				{...props}
				dialogClassName="post-form-modal"
				centered
				animation={false}
				show={show}
				onHide={() => {
					handleReset();
					setShow(false);
				}}
			>
				<Modal.Header bsPrefix="post-form-modal__header" closeButton>
					<Modal.Title bsPrefix="post-form-modal__header-title">
						Cập nhật ảnh đại diện
					</Modal.Title>
				</Modal.Header>
				<Modal.Body bsPrefix="post-form-modal__body">
					{!file ? (
						<div className="row post-form-modal__body-top">
							<div className="col-5 post-form-modal__body-top-field">
								<label
									className="custom-file-upload"
									htmlFor="file-upload"
								>
									<input
										id="file-upload"
										onChange={(e) => handleFile(e)}
										type="file"
										name="file"
									/>
									+ Tải ảnh lên
								</label>
							</div>
							<div className="col-5 post-form-modal__body-top-field">
								<button type="button">Thêm khung</button>
							</div>
							<div className="col-2 post-form-modal__body-top-field">
								<button type="button">
									<FontAwesomeIcon
										className="icon"
										icon={Theme.ICONS.pen}
									/>
								</button>
							</div>
						</div>
					) : (
						<div className="post-form-modal__body-main">
							<div className="post-form-modal__body-main-top">
								<textarea
									placeholder="Mô tả"
									value={description}
									onChange={(e) => {
										setDescription(e.target.value);
									}}
								/>
								<div className="image-area">
									<img
										key={file}
										className="image-show"
										style={{
											width: "50%",
										}}
										src={URL.createObjectURL(file)}
										alt="avatar"
									/>
								</div>
								<div className="">
									<FontAwesomeIcon
										className="icon"
										icon={Theme.ICONS.globeAsia}
									/>
									<span>
										Ảnh của bạn sẽ được hiển thị công khai
									</span>
								</div>
							</div>
							<div className="post-form-modal__body-main-bottom">
								<button
									type="button"
									className="cancel"
									onClick={() => handleReset()}
								>
									Hủy
								</button>
								<button
									type="button"
									className="save"
									onClick={handleSave}
								>
									Lưu
								</button>
							</div>
						</div>
					)}
				</Modal.Body>
			</Modal>
		</>
	);
};

export default Cover;
