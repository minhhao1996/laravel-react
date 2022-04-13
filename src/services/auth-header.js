import StorageKeys from "../constants/storage-keys";

 const authHeader=()=> {
    const user = JSON.parse(localStorage.getItem(StorageKeys.access));
    if (user && user.token) {
        return { Authorization: `${user.token_type}` + user.token };
    } else {
        return {};
    }
}
export default