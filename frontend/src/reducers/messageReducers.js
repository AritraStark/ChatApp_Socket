import { MESSAGES_GET_FAIL, MESSAGES_GET_INIT, MESSAGES_GET_SUCCESS, MESSAGE_SEND_FAIL, MESSAGE_SEND_INIT, MESSAGE_SEND_SUCCESS } from "../constants/messageConstants"

export const sendMessageReducer = (state = {}, action) => {
    switch(action.type){
        case MESSAGE_SEND_INIT:
            return {
                loading: true,
                success:false
            }
        case MESSAGE_SEND_SUCCESS:
            return{
                loading: false,
                messageSent: action.payload,
                success: true
            }
        case MESSAGE_SEND_FAIL:
            return{
                success: false,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}
export const getMessagesReducer = (state = {}, action) => {
    switch(action.type){
        case MESSAGES_GET_INIT:
            return {
                loading: true,
                success:false
            }
        case MESSAGES_GET_SUCCESS:
            return{
                loading: false,
                messages: action.payload,
                success: true
            }
        case MESSAGES_GET_FAIL:
            return{
                success: false,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}
