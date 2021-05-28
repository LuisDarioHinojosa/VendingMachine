import * as ActionTypes from './ActionTypes';

let defaultUser = {name: "Luis Dario", emp_id: "default", password: "default", account: 0, admin: 0};

export const authenticationReducer = (state = {loggedIn:false,errMessage:null,user:defaultUser},action) =>{
    switch(action.type){
        case ActionTypes.USER_LOGIN_REQUEST:
            return{...state,loggedIn:false,errMessage:null,user:defaultUser};
        case ActionTypes.USER_LOGIN_SUCCESS:
            return{...state,loggedIn:true,errMessage:null,user:action.payload};
        case ActionTypes.USER_LOGIN_FAILURE:
                return {...state,loggedIn:false,errMessage:action.payload,user:defaultUser};
        case ActionTypes.USER_LOGOUT:
                return {...state,loggedIn:false,errMessage:null,user:defaultUser};
        default:
            return state;
    }
}

