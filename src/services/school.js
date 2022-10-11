import axiosInstance from '../helpers/axiosInstance';

// Create school
export const createSchool = (data) => {
	const url = '/api/v1/school/create';
	const body = data;
	return axiosInstance.post(url, body)
		.then(response => { return response.data; });
};

// Get schools
export const getAllSchools = () => {
	const url = '/api/v1/school/getAll';
	return axiosInstance.get(url)
		.then(response => { return response.data; });
};