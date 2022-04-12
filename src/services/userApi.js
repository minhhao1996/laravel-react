import StorageKeys from "../constants/storage-keys";
import axiosClient from "./axiosClient";

const userApi = {
    register(data) {
        const url = 'register/';
        return axiosClient.post(url, data);
    },
    login(data) {
        const url = '/api/login/';
        const res= axiosClient.post(url, data);
        return  {
            status: res.status + "-" + res.statusText,
            headers: res.headers,
            data: res.data,
        };

    },
    async getUser(params) {
        const newParams = { ...params }
        const accessToken = localStorage.getItem(StorageKeys.access)
        const url = `users/`;
        const response = await axiosClient.get(url, {
            params: { ...newParams },
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response
    },
    async getProfile(params) {
        const newParams = { ...params }
        const accessToken = localStorage.getItem(StorageKeys.access)
        const response = await axiosClient.get(`/detail/`, {
            params: { ...newParams },
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return response
    },
}

export default userApi