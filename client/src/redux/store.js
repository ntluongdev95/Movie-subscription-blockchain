import { createStore,applyMiddleware } from "redux";
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers'


const middleware =[thunk]; 

const userInfoFromStorage = localStorage.getItem('user-movie')
  ? JSON.parse(localStorage.getItem('user-movie'))
  : null 

const subscriptionInfoFromStorage = localStorage.getItem('subscription')
  ? JSON.parse(localStorage.getItem('subscription'))
  : null 

const initialState={
  userSignup:{userDK:userInfoFromStorage},
    plan:{ plan:subscriptionInfoFromStorage}
}
const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))

)
export default store