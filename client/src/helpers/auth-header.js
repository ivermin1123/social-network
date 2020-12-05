const { user } = JSON.parse(localStorage.getItem("user"));

const configAxios = {
	headers: {
		Authorization: user.token,
	},
};

export default configAxios;
