import actionTypes from '../actions/actionTypes'

const initState = {
    // Khoi tao mac dinh state
    isLogged: false,
    isLoggedIn: false,
    adminInfo: {},
    toggleModal:false
}

export default function (state = initState, actions) {

    switch (actions.type) {
        case actionTypes.ADMIN_LOGIN_SUCCESS:
            return {...state,
                isLoggedIn: true,
                adminInfo: actions.adminInfo
            }
        case actionTypes.ADMIN_LOGIN_FAIL:
            return {...state,
                isLoggedIn: false,
                adminInfo: null
            }
        case actionTypes.ADMIN_PROCESS_LOGOUT:
            return {...state,
                isLoggedIn: false,
                adminInfo: null
            }
        case actionTypes.MODAL_TOGGLE:
            return {...state,
                toggleModal: actions.toggle
            }
        default:
            return state;
    }

}