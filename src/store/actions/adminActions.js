import actionTypes from './actionTypes';
export const loginAdminHandler = () => {
    return {
        type: 'LOGIN_ADMIN',
        payload: true,
    };
};
export const adminLoginSuccess = (adminInfo) => (
    {
        type: actionTypes.ADMIN_LOGIN_SUCCESS,
        adminInfo: adminInfo,
    }
);
export const adminRegisterSuccess = (adminInfo) => (
    {
        type: actionTypes.ADMIN_REGISTER_SUCCESS,
        adminInfo: adminInfo,
    }
);