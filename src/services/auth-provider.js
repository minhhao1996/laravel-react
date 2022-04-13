import StorageKeys from "../constants/storage-keys";

async function getToken() {
    // Nếu bạn sử dụng token provider như auth0, tại đây bạn sẽ gọi API
    // để lấy token, bạn không nên lưu token vào localStorage, đây chỉ là demo
    return window.localStorage.getItem(StorageKeys.access)
}

function handleUserResponse({user}) {
    window.localStorage.setItem(StorageKeys.user, user.token)
    return user
}

function login({login, password}) {
    return client('login', {login, password}).then(handleUserResponse)
}

function register({username, password}) {
    return client('register', {username, password}).then(handleUserResponse)
}

async function logout() {
    window.localStorage.removeItem(StorageKeys.access)
}

const authURL = 'http://127.0.0.1:8000/api'

async function client(endpoint, data) {
    const config = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'},
    }

    return window.fetch(`${authURL}/${endpoint}`, config).then(async response => {
        const data = await response.json()
        if (response.ok) {
            return data
        } else {
            return Promise.reject(data)
        }
    })
}

export {getToken, login, register, logout}