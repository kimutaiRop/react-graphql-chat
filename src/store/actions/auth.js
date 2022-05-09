import { client } from "../.."
import { REFRESH_QUERY } from "../../queries"

 

export const userSuccess = (user) => {
    console.log(user)
    return {
        type: 'UPDATE_USER',
        user: user
    }
}
export const updateToken = (token) => {
    return {
        type: 'UPDATE_TOKEN',
        token: token
    }
}

export const updateUser = (user) => {
    return dispatch =>{
        dispatch(userSuccess(user))
    }
}

const tryRefreshToken = () => {
    client.mutate({
        mutation: REFRESH_QUERY,
        variables: {
            token: localStorage.getItem('refreshToken')
        }
    })
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            // refresh the token
            dispatch(tryRefreshToken())
        }, expirationTime * 1000);
    };
};


export const finishAuth = (data) => {
    localStorage.setItem('token', data.tokenAuth.token)
    localStorage.setItem('refreshToken', data.tokenAuth.refreshToken)
    return dispatch => {
        dispatch(userSuccess(data.tokenAuth.user))
        dispatch(updateToken(data.tokenAuth.token))
    }
 }