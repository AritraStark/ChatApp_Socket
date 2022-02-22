import axios from 'axios'
import { MESSAGE_SEND_INIT, MESSAGE_SEND_SUCCESS, MESSAGE_SEND_FAIL, MESSAGES_GET_INIT, MESSAGES_GET_SUCCESS, MESSAGES_GET_FAIL } from '../constants/messageConstants'

export const sendMessage = (id,message) => async(dispatch, getState) => {
    try {
        dispatch({
            type: MESSAGE_SEND_INIT
        })

        const {
            login:{userDetails}
        } = getState()

        const config = {
            headers:{
                'Content-type':'application/json',
                'x-auth': userDetails.token
            }
        }

        const {data} = await axios.post(`/api/messages/${id}`, {message} , config)
        

        dispatch({
            type: MESSAGE_SEND_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: MESSAGE_SEND_FAIL,
            payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
        })
    }
}

export const getMessages = (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type: MESSAGES_GET_INIT
        })

        const {
            login:{userDetails}
        } = getState()

        const config = {
            headers:{
                'Content-type':'application/json',
                'x-auth': userDetails.token
            }
        }

        const {data} = await axios.get(`/api/messages/${id}`, config)
        

        dispatch({
            type: MESSAGES_GET_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: MESSAGES_GET_FAIL,
            payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
        })
    }
}