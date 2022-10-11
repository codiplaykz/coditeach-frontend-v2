import axiosInstance from '../helpers/axiosInstance';

// SIGN UP
export const sign_up = (data) => {
	const url = '/api/v1/auth/sign_up';
	const body = data;
	return axiosInstance.post(url, body)
		.then(response => { return response.data; })
		.catch(err => console.log(`Sign up error: ${err.response}`));
};

// SIGN IN
export const sign_in = (data) => {
	const url = '/api/v1/auth/sign_in';
	let body = data;
	return axiosInstance.post(url, body)
		.then(response => { return response.data; });
};

// REFRESH TOKENS
export const refreshTokens = () => {
	const url = '/api/v1/auth/refresh';
	const data = {
		token: localStorage.getItem('refreshToken')
	};
	return axiosInstance.post(url, data)
		.then(response => { return response.data; });
};
