import {LOG_IN_USER, LOAD_USER_INFO,CLOSE_POPUP} from "./types";
import {sendRequest} from "./utils";

export function logInUser() {
    return async dispatch => {
        // dispatch(showLoader())
        let url = "main/authorization";
        const response = await sendRequest(url,"GET");
        dispatch({type: LOG_IN_USER, payload: response})
        // dispatch(hideLoader())
    }
}

export function loadUserInfo(userInfo) {
    return async dispatch => {
        // dispatch(showLoader())
        let url = "main/registration";
        const response = await sendRequest(userInfo,url,"POST");
        dispatch({type: LOAD_USER_INFO, payload: response})
        // dispatch(hideLoader())
    }
}


export function closePopup() {
    return {
        type: CLOSE_POPUP
    }
}

