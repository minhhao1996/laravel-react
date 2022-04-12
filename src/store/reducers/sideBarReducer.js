const initState = {
    // Khoi tao mac dinh state
    sidebarShow: true,
    isLogged:false,
}

export default function (state = initState, actions) {

    switch (actions.type) {
        case 'SET_SIDE_BAR':
            return { ...state,sidebarShow:actions.payload}
        default:
            return state;
    }

}