import React from "react";
import { Cover ,Introduction } from "../components/_components";
import "../styles/_account.scss"
const  AccountPage = () => {
	const acc = {
		cover:
			"https://scontent.fvca1-1.fna.fbcdn.net/v/t1.0-9/118172414_2756230577946496_8253961853093212477_o.jpg?_nc_cat=108&ccb=2&_nc_sid=e3f864&_nc_ohc=eiVtY6_tP7gAX9ONx1M&_nc_ht=scontent.fvca1-1.fna&oh=a25af89e181f596d6a2731148b2e0892&oe=5FEAA860",
		avt:
			"https://scontent.fvca1-2.fna.fbcdn.net/v/t1.0-1/c0.67.480.480a/p480x480/116914402_2736203649949189_1154568876833054310_o.jpg?_nc_cat=107&ccb=2&_nc_sid=7206a8&_nc_ohc=LCSC4jRgcVUAX-DZ5u6&_nc_ht=scontent.fvca1-2.fna&tp=27&oh=b1deefc9d9a4b44cd0e9e06b96c6c660&oe=5FED1531",
		displayName: "Hoàng Yến",
	};

	return (
		<div>
			<Cover acc={acc}/>
			<Introduction/>
		</div>
	);
}

export default AccountPage;
