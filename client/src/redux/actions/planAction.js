import { CREATE_SUB_FAILED, CREATE_SUB_REQUEST, CREATE_SUB_SUCCESS, DELETE_SUB_FAILED, DELETE_SUB_SUCCESS, GET_ALL_PLANS_FAILED, GET_ALL_PLANS_REQUEST, GET_ALL_PLANS_SUCCESS, GET_SUB_BY_ID_FAILED, GET_SUB_BY_ID_REQUEST, GET_SUB_BY_ID_SUCCESS } from "../reducers/constants"
import axios from 'axios'
import { createSub, deleteSub, getSubById } from "./api"
export const getPlansAction = ()=>async(dispatch) =>{
    try {
        dispatch({type:GET_ALL_PLANS_REQUEST})
        const config={
            headers:{
             'Content-Type': 'application/json', 
            }
        }
        const{data} = await axios.get('/api/plan',config)
        dispatch({
            type:GET_ALL_PLANS_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type: GET_ALL_PLANS_FAILED,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
    }
}

export const getSubByIdAction =(id)=>async(dispatch,getState)=>{
    try {
        dispatch({type:GET_SUB_BY_ID_REQUEST})
       const{data} = await getSubById(id,getState().userSignup.userDK.token)
       dispatch({
           type:GET_SUB_BY_ID_SUCCESS,
           payload:data
       })
       localStorage.setItem('subscription',JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: GET_SUB_BY_ID_FAILED,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
        
    }
}

export const createSubAction =(form)=>async(dispatch,getState)=>{
    try {
        dispatch({type:CREATE_SUB_REQUEST})
       const{data} = await createSub(form,getState().userSignup.userDK.token)
       dispatch({
           type:CREATE_SUB_SUCCESS,
           payload:data
       })
       localStorage.setItem('subscription',JSON.stringify(data.newPlan))
    } catch (error) {
        dispatch({
            type: CREATE_SUB_FAILED,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
        
    }
}

export const deleteSubAction =(id)=>async(dispatch,getState)=>{
    try {
       const{data} = await deleteSub(id,getState().userSignup.userDK.token)
       dispatch({
           type:DELETE_SUB_SUCCESS,
           payload:data
       })
       localStorage.setItem('subscription',JSON.stringify(data.newPlan))
    } catch (error) {
        dispatch({
            type: DELETE_SUB_FAILED,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
        
    }
}