import { GET_USER_FAILED, GET_USER_REQUEST, GET_USER_SUCCESS, SUBSCRIPTION_FAILED, SUBSCRIPTION_SUCCESS, USER_LOGOUT, USER_SIGNIN_FAILED, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNUP_FAILED, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from "./constants";

const initialState ={
    loading:false,
    userDK:null,
    error:''
}

export const userSignupReducer =(state=initialState,action)=>{
    switch(action.type){
        case USER_SIGNUP_REQUEST:
        case USER_SIGNIN_REQUEST:
            return{
                loading:true
            }
        case USER_SIGNUP_SUCCESS:
        case USER_SIGNIN_SUCCESS:
            return{
                loading:false,
                userDK:action.payload
            }
        case USER_SIGNUP_FAILED:
        case USER_SIGNIN_FAILED:
            return{
                loading:false,
                userDK:null,
                error:action.payload
            }
        case USER_LOGOUT:
            return{}
        default:
            return state
    }
}

export const getUserReducer = (state={},action)=>{
    switch(action.type){
        case GET_USER_REQUEST:
            return{
                loading:true,
            }
        case GET_USER_SUCCESS:
            return{
                loading:false,
                user:action.payload
            }
        case GET_USER_FAILED:
            return{
                loading:false,
                user:null,
                error:action.payload
            }
        case SUBSCRIPTION_SUCCESS:
            return{
                loading:false,
                subscripted:true,
                user:action.payload
            }
        case SUBSCRIPTION_FAILED:
            return{
                loading:false,
                error:action.payload
            }
        default:
            return state
    }
}