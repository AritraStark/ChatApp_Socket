import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
    loginReducer,
    signupReducer,
    getUserDetailsReducer,
    deleteUserReducer,
    updateUserReducer,
    getUsersReducer
} from './reducers/userReducers.js'

import {
    getMessagesReducer,
    sendMessageReducer,
} from './reducers/messageReducers.js'

//apply redux middleware to the store to allow async actions
const middleware = [thunk]

const reducers = combineReducers({
    login: loginReducer,
    signup: signupReducer,
    userDelete: deleteUserReducer,
    userUpdate: updateUserReducer,
    userDetailsGet: getUserDetailsReducer,
    usersGet: getUsersReducer,
    messagesGet: getMessagesReducer,
    messageSend: sendMessageReducer,
})

//get user details from the local storage if there is any
const userDetailsFromStorage = localStorage.getItem('userDetails')?JSON.parse(localStorage.getItem('userDetails')):""
//get the auth state from the local storage if token is existing in the local storage
const authStateFromStorage = userDetailsFromStorage.token&&true

//define the initial state of the store
const initialState = {
    login:{
        success: authStateFromStorage,
        userDetails: userDetailsFromStorage
    },
}

//define store for the application
const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
)

export default store