import axiosClient from "./axiosClient";

const userApi = {
    register(data) {
        const url = 'register/';
        return axiosClient.post(url, data);
    },
    login(data) {
        const url = '/api/login/';
        return  axiosClient.post(url, data);
    },
    logout() {
        localStorage.removeItem("user");
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