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
    },
    store(data) {
        const url = '/api/users/store';
        return axiosClient.post(url, data);
    },
    update(data, id) {
        const url = '/api/users/update/'+id;
        return axiosClient.post(url, data);
    },
    destroy(id){
        const url = '/api/users/destroy/'+id;
        return axiosClient.delete(url);
    }
}

export default userApi