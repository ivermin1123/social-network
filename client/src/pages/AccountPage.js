import React from "react";
import {
	Cover,
	Introduction,
	Wall,
	Images,
	Friends,
} from "../components/_components";
import "../assets/styles/_account.scss";

const AccountPage = () => {
	const listImage = [
		"https://scontent.fsgn1-1.fna.fbcdn.net/v/t1.0-9/84003375_2572400089662880_7646270190476328960_n.jpg?_nc_cat=105&ccb=2&_nc_sid=0debeb&_nc_ohc=QrcgLbs2mSgAX8RKpRZ&_nc_ht=scontent.fsgn1-1.fna&oh=6b7af98b5586f41b18bb30a25cc70f79&oe=5FF135E2",
		"https://scontent.fsgn1-1.fna.fbcdn.net/v/t1.0-9/82515029_2565303910372498_501621299357941760_o.jpg?_nc_cat=106&ccb=2&_nc_sid=0debeb&_nc_ohc=vKLDh3_iNNEAX82qriy&_nc_ht=scontent.fsgn1-1.fna&oh=fe488322cc93a4314f9aac919a964214&oe=5FF2D662",
		"https://scontent.fsgn8-1.fna.fbcdn.net/v/t1.0-9/80498192_2547130955523127_7612657518719795200_o.jpg?_nc_cat=108&ccb=2&_nc_sid=0debeb&_nc_ohc=YIQ4Eb2Xi-cAX9TckF6&_nc_ht=scontent.fsgn8-1.fna&oh=368f5c55b800f41b57bfdee470e9f694&oe=5FF23809",
		"https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.0-9/56852823_2346635882239303_7906675625295872000_n.jpg?_nc_cat=109&ccb=2&_nc_sid=0debeb&_nc_ohc=Nz8tgpnNrl4AX8kV79G&_nc_ht=scontent.fsgn3-1.fna&oh=8e4d77ce10179e5a0d96736c10e83cac&oe=5FF2BF9B",
		"https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.0-9/118310303_2749420581960829_1865345142685906054_o.jpg?_nc_cat=111&ccb=2&_nc_sid=8bfeb9&_nc_ohc=vGYnUfln62oAX8TLje7&_nc_ht=scontent.fsgn3-1.fna&oh=04c7ef944db5277c13546a47c6b4e9bc&oe=5FF33B77",
	];
	const acc = {
		cover:
			"https://firebasestorage.googleapis.com/v0/b/my-project-a55fd.appspot.com/o/cover.jpg?alt=media&token=7fa54ce4-d846-4348-8c15-e8ae276dfa88",
		avt:
			"https://scontent.fvca1-2.fna.fbcdn.net/v/t1.0-1/c0.67.480.480a/p480x480/116914402_2736203649949189_1154568876833054310_o.jpg?_nc_cat=107&ccb=2&_nc_sid=7206a8&_nc_ohc=LCSC4jRgcVUAX-DZ5u6&_nc_ht=scontent.fvca1-2.fna&tp=27&oh=b1deefc9d9a4b44cd0e9e06b96c6c660&oe=5FED1531",
		displayName: "Hoàng Yến",
		listImage: listImage,
		totalFriend: 469,
	};

	return (
		<div className="account-page">
			<Cover acc={acc} />
			<div className="main-content row">
				<div className="col-lg-5 col-md-12 main-content-left">
					<div className="main-content-item">
						<Introduction acc={acc} />
						<Images acc={acc} />
						<Friends acc={acc} />
					</div>
				</div>
				<div className="col-lg-7 col-md-12 main-content-right">
					<div className="main-content-item">
						<Wall acc={acc} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccountPage;
