export const setSideBar = (show) => {

    return {
        type: 'SET_SIDE_BAR',
        payload: show,
    };
};
export const toggleOpenShop = () => {
    return {
        type: 'TOGGLE_OPEN_SHOP',
    };
};