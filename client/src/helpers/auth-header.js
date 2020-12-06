const user = JSON.parse(localStorage.getItem("user"));

const token = user ? user.user.token : null;
const configAxios = {
	headers: {
		Authorization: token,
	},
};

export default configAxios;
