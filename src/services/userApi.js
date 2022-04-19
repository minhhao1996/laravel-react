import axiosClient from "./axiosClient";

const userApi = {
    register(data) {
        const url = '/api/register/';
        return axiosClient.post(url, data);
    },
    login(data) {
        const url = '/api/login/';
        return  axiosClient.post(url, data);
    },
    logout() {
        localStorage.removeItem("user");
    },
    verify(data) {
        const url = '/api/verification/verify/';
        return axiosClient.post(url, data);
    },
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    },
    async getAllUsers (){
        const url = '/api/users';
        return  axiosClient.get(url);
    }
}

export default userApi