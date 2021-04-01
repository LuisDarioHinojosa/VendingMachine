import * as ActionTypes from './ActionTypes';

export const authenticationReducer = (state = {loggedIn:false,errMessage:null,user:[]},action) =>{
    switch(action.type){
        case ActionTypes.USER_LOGIN_REQUEST:
            return{state};
        case ActionTypes.USER_LOGIN_SUCCESS:
            return{...state,loggedIn:true,user:action.payload,errMessage:null};
        case ActionTypes.USER_LOGIN_FAILURE:
                return {...state,loggedIn:false,errMessage:action.payload,user:[]};
        case ActionTypes.USER_LOGOUT:
                return {state};
        default:
            return state;
    }
}

