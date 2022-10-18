// Get students num
import axiosInstance from "./axiosInstance";

export const getAllStudents = () => {
    const url = '/api/v1/admin/getAll/students';
    return axiosInstance.get(url)
        .then(response => { return response.data; });
};

export const getAllTeachers = () => {
    const url = '/api/v1/admin/getAll/teachers';
    return axiosInstance.get(url)
        .then(response => { return response.data; });
};