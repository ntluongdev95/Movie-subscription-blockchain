import { combineReducers } from "redux";
import { blockchainReducer } from "./blockchainReducer";
import { createSubscription, deleteSubscription, getPlansReducer, getSubByIdReducer } from "./planReducer";
import { getUserReducer, userSignupReducer } from "./userReducer";


export default combineReducers({
  blockchain:blockchainReducer,
 userSignup:userSignupReducer,
 userDetail:getUserReducer,
 allPlans:getPlansReducer,
 plan:getSubByIdReducer,
 subscripted:createSubscription,
 cancelled:deleteSubscription,
})

