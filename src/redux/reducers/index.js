import { combineReducers } from "redux";
import types from "../types";

// reducer
import auth from "./auth";
import universitiesReducer from "./universitiesReducer";
import examReducer from "./examReducer";

const appReducer = combineReducers({
    auth,
    universitiesReducer,
    examReducer,
});

const rootReducer = (state, action) => {
    if(action.type == types.CLEAR_REDUX_STATE){
        state = undefined;
    }
    return appReducer(state, action);
}

export default rootReducer