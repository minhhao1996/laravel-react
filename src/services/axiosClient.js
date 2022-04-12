import axios from 'axios';

export default  axiosClient = axios.create({
    baseURL: ' http://127.0.0.1:8000/',
    headers: {
        'content-type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    },
});