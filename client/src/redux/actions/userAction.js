import { GET_USER_FAILED, GET_USER_REQUEST, GET_USER_SUCCESS, SUBSCRIPTION_FAILED, SUBSCRIPTION_SUCCESS, USER_LOGOUT, USER_SIGNIN_FAILED, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNUP_FAILED, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from "../reducers/constants"
import axios from 'axios'
import { getUserDetail } from "./api"
import { toast } from "react-toastify";
export const userSignupAction =(dataForm)=>async dispatch=>{
    try {
        dispatch({type:USER_SIGNUP_REQUEST})
        const config={
            headers:{
             'Content-Type': 'application/json', 
            }
        }
        const{data} = await axios.post('/api/user/signup',dataForm,config)
        dispatch({
            type:USER_SIGNUP_SUCCESS,
            payload:data
        })
        localStorage.setItem('user-movie',JSON.stringify(data))
        document.location.href = '/movie'
       
    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAILED,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
    }
}

//LOGOUT
export const logoutAction =()=> async dispatch =>{
    localStorage.removeItem('user-movie')
    localStorage.removeItem('subscription')
    dispatch({type:USER_LOGOUT})
    document.location.href = '/signin'
}

//LOGIN
export const userLoginAction =(email,password)=>async dispatch =>{
    try {
        dispatch({type:USER_SIGNIN_REQUEST})
        const config={
            headers:{
             'Content-Type': 'application/json', 
            }
        }
        const{data}=await axios.post('/api/user/login',{email,password},config)
        dispatch({
            type:USER_SIGNIN_SUCCESS,
            payload:data
        })
        localStorage.setItem('user-movie', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAILED,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
        toast.warn(error)
   
}}

export const getUserDetailAction =()=>async (dispatch,getState)=>{
    try {
        dispatch({type:GET_USER_REQUEST})
        const{data} = await getUserDetail(getState().userSignup.userDK.token)
        dispatch({
            type:GET_USER_SUCCESS,
            payload:data
        })
    } catch (error) {
        const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          if (message === 'Not authorized, token failed') {
            dispatch(logoutAction())
          }
      dispatch({
        type: GET_USER_FAILED,
        payload: message,
      })
    }
}

export const subscriptionAction =(userWallet)=>async(dispatch,getState)=>{
    try {
        const{data} = await subscription(userWallet,getState().userSignup.userDK.token)
        dispatch({
            type:SUBSCRIPTION_SUCCESS,
            payload:data
        }) 
    } catch (error) {
        const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      dispatch({
        type: SUBSCRIPTION_FAILED,
        payload: message,
      })
    }
}



const headers = (token) => ({
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });

  export const subscription =(userWallet,token)=>axios.put('/api/user/subcription',userWallet,headers(token))