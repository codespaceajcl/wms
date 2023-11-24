import { combineReducers } from "redux";
import { ChatOpenStatusReducer } from "./Chat";

const rootReducer = combineReducers({
    ChatOpen: ChatOpenStatusReducer
})

export default rootReducer;