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

// Get school by id
export const getSchoolById = (id) => {
	const url = `/api/v1/school/get?id=${id}`;
	return axiosInstance.get(url)
		.then(response => { return response.data; });
}

// Delete school by id
export const deleteSchoolById = (id) => {
	const url = `/api/v1/school/delete?id=${id}`;
	return axiosInstance.delete(url)
		.then(response => { return response.data; });
}

// Edit school
export const editSchool = (data) => {
	const url = `/api/v1/school/update`;
	return axiosInstance.put(url, data)
		.then(response => { return response.data; });
}



