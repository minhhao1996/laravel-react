// import axios from 'axios';
//
// const axiosClient = axios.create({
//     baseURL: ' http://127.0.0.1:8000/',
//     headers: {
//         'content-type': 'application/json',
//         'Accept': 'application/json',
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
//
//     },
// });
// axiosClient.interceptors.response.use(
//     (response)=>{
//         return response
//     }
// )
// export default axiosClient

import axios from 'axios';
const axiosClient = () => {
    const defaultOptions = {
        baseURL:'http://127.0.0.1:8000/',
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
        (response)=>{
            return response
        }
    )
    return instance;
};

export default axiosClient();