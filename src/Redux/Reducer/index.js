import { combineReducers } from "redux";
import { ChatOpenStatusReducer } from "./Chat";
import { ListMaterialPostReducer } from "./Admin";

const rootReducer = combineReducers({
    ChatOpen: ChatOpenStatusReducer,

    //ADMIN
    postMaterial: ListMaterialPostReducer
})

export default rootReducer;