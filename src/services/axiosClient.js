

import axios from 'axios';

const axiosClient = () => {
    const baseURL= 'http://127.0.0.1:8000/';
    const defaultOptions = {
        baseURL:baseURL,
        headers: {
            'Content-Type': 'application/json',
            'Accept':'application/json',
        },
    };

    // Create instance
    let instance = axios.create(defaultOptions);

    // Set the AUTH token for any request
    instance.interceptors.request.use(function (config) {
        const adminInfo =JSON.parse(localStorage.getItem('persist:admin')).adminInfo
        const token= JSON.parse(adminInfo);
        config.headers.Authorization =  token ? `${token.token_type} ${token.token}` : '';
        return config;
    });
    instance.interceptors.response.use(
        response=>{
            return response
        },
        // async (error) => {
        //     if (error.response.status===401){
        //         localStorage.removeItem('persist:admin')
        //     }
        //     return true;
        //
        // }
    )
    return instance;
};

export default axiosClient();