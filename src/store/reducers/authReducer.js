
const initState = {
    // Khoi tao mac dinh state
    isLogged:false,
    currentUser:{}
}

export default function (state = initState, actions) {
    switch (actions.type) {
        case 'LOGIN_ADMIN':
            return {...state, currentUser: actions.payload}
        default:
            return state;
    }

}