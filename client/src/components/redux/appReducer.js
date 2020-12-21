import {LOG_IN_USER, LOAD_USER_INFO, CLOSE_POPUP} from "./types";

const initialState = {
    addressList: false,
    registrationStatus: false
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN_USER:
            return {...state, addressList: action.payload}
        case LOAD_USER_INFO:
            return {...state, registrationStatus: action.payload}
        case CLOSE_POPUP:
            return {...state, registrationStatus: false}
        default:
            return state
    }
}
