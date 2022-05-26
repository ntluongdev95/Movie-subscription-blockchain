import { CREATE_SUB_FAILED, CREATE_SUB_REQUEST, CREATE_SUB_SUCCESS, DELETE_SUB_FAILED, DELETE_SUB_SUCCESS, GET_ALL_PLANS_FAILED, GET_ALL_PLANS_REQUEST, GET_ALL_PLANS_SUCCESS, GET_SUB_BY_ID_FAILED, GET_SUB_BY_ID_REQUEST, GET_SUB_BY_ID_SUCCESS } from "./constants"

export const getPlansReducer =(state ={plans:[]},action)=>{
    switch(action.type){
        case GET_ALL_PLANS_REQUEST:
            return{
                loading:true
            }
        case GET_ALL_PLANS_SUCCESS:
            return{
                loading:false,
                plans:action.payload
            }
        case GET_ALL_PLANS_FAILED:
            return{
                loading:false,
                plans:null,
                error:action.payload
            }
        default:
            return state
    }
}

export const getSubByIdReducer =(state={plan:{}},action)=>{
    switch(action.type){
        case GET_SUB_BY_ID_REQUEST:
            return{
                loading:true
            }
        case GET_SUB_BY_ID_SUCCESS:
            return{
                loading:false,
                plan:action.payload
            }
        case GET_SUB_BY_ID_FAILED:
            return{
                loading:false,
                plan:null,
                error:action.payload
            }
        default:
            return state
    }
}

export const createSubscription =(state={},action)=>{
    switch(action.type){
        case CREATE_SUB_REQUEST:
            return{
                loading:true
            }
        case CREATE_SUB_SUCCESS:
            return{
                loading:false,
                subscripted:true
            }
        case CREATE_SUB_FAILED:
            return{
                loading:false,
                message:'',
                error:action.payload
            }
        default:
            return state
    }
}

export const deleteSubscription =(state={},action)=>{
    switch(action.type){
        case DELETE_SUB_SUCCESS:
            return{
                loading:false,
                cancelled:true
            }
        case DELETE_SUB_FAILED:
            return{
                loading:false,
                cancelled:false,
                error:action.payload
            }
        default:
            return state
    }
}