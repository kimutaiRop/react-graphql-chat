import * as actionType from "../actionTypes";
import { updateObject } from "../utility";

const initialState = {
    messages: [],
}

const updateMessages = (state, action) => {
    let messages = []
    return updateObject(state, {
        messages: messages
    });
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.NEW_MESSAGE:
            updateMessages(state, action)
        default:
            return state;
    }
}

export default reducer;
