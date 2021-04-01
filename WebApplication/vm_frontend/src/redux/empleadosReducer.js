//import { actionTypes } from 'react-redux-form';
import * as ActionTypes from './ActionTypes';




export const empleadosReducer = (state = {isLoading:true,errMessage:null,employees:[]},action) =>{
    switch(action.type){
        case ActionTypes.ADD_EMPLOYEES:
            return{...state,isLoading:false,employees:action.payload};
        case ActionTypes.EMPLOYEES_FAILED:
            return{...state,isLoading:false,errMessage:action.payload};
        case ActionTypes.EMPLOYEES_LOADING:
                return {...state,isLoading:true,errMess:null,leaders:[]};
        default:
            return state;
    }
}



/*
export const empleadosReducer = (state = EMPLEADOS,action) =>{
    switch(action.type){
        default:
            return state;
    }
}
*/