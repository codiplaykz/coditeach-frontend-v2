import axios from 'axios';
import {env} from "../constants";
import {refreshTokens} from "./auth";

const axiosInstance = axios.create({ baseURL: env.prod_start_point });

axiosInstance.interceptors.request.use(async (config) => {
	const token = await localStorage.getItem('accessToken');
	if (token) {
		console.log('accessToken: ', token);
		config.headers['Authorization'] = `${token}`;
	}

	return config;
});

axiosInstance.interceptors.response.use(function (response) {
	return response;
}, function (error) {
	if (401 === error.response.status) {
		refreshTokens().then(res => {
			localStorage.setItem('accessToken', res?.accessToken);
			localStorage.setItem('refreshToken"', res?.refreshToken);
		});
	}

	return Promise.reject(error)
});

export default axiosInstance;