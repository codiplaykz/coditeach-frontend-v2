import axiosInstance from './axiosInstance';

// Create school
export const createSchool = (data) => {
	const url = '/api/v1/school/create';
	return axiosInstance.post(url, data)
		.then(response => { return response.data; });
};

// Get schools
export const getAllSchools = () => {
	const url = '/api/v1/school/getAll';
	return axiosInstance.get(url)
		.then(response => { return response.data; });
};