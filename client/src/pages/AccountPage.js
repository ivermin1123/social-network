import React from "react";
import { Cover, Introduction, Wall, Images } from "../components/_components";
import "../assets/styles/_account.scss";

const AccountPage = () => {
	const acc = {
		cover:
			"https://firebasestorage.googleapis.com/v0/b/my-project-a55fd.appspot.com/o/cover.jpg?alt=media&token=7fa54ce4-d846-4348-8c15-e8ae276dfa88",
		avt:
			"https://scontent.fvca1-2.fna.fbcdn.net/v/t1.0-1/c0.67.480.480a/p480x480/116914402_2736203649949189_1154568876833054310_o.jpg?_nc_cat=107&ccb=2&_nc_sid=7206a8&_nc_ohc=LCSC4jRgcVUAX-DZ5u6&_nc_ht=scontent.fvca1-2.fna&tp=27&oh=b1deefc9d9a4b44cd0e9e06b96c6c660&oe=5FED1531",
		displayName: "Hoàng Yến",
	};

	return (
		<div className="account-page">
			<Cover acc={acc} />
			<div className="main-content row">
				<div className="col-lg-5 col-md-12 main-content-left">
					<div className="main-content-item">
						<Introduction />
						<Images />
					</div>
				</div>
				<div className="col-lg-7 col-md-12 main-content-right">
					<div className="main-content-item">
						<Wall />
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccountPage;
