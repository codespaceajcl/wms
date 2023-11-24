export const ChatOpenStatusReducer = (state = {}, action) => {
    switch (action.type) {
        case "CHAT_ACTION":
            return {
                isOpenChat: action.openChat,
            }
        default:
            return state
    }
}