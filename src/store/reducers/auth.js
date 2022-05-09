import * as actionType from "../actionTypes";
import { updateObject } from "../utility";

const initialState = {
    token: null,
    user: null,
}

const updateUser = (state, action) => {
    return updateObject(state, {
        user: action.user
    });
}

const updateToken = (state, action) => {
    
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.UPDATE_USER:
            return updateUser(state, action)
        case actionType.UPDATE_TOKEN:
            return updateToken(state, action)
        default:
            return state;
    }
}

export default reducer;
