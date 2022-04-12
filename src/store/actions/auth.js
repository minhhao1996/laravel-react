export const loginAdminHandler = (userName, password) => {
    return {
        type: 'LOGIN_ADMIN',
        payload: {login:userName,password:password},
    };
};
export const toggleOpenShop = () => {
    return {
        type: 'TOGGLE_OPEN_SHOP',
    };
};