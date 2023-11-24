export const chatOpenStatus = (getAction) => (dispatch) => {
    dispatch({
        type: 'CHAT_ACTION',
        openChat: getAction ? true : false
    })
};