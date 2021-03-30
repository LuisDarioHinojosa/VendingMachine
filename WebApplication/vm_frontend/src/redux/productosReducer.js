import * as ActionTypes from './ActionTypes';


import PRODUCTOS from '../DB/Products'
export const productosReducer = (state = {isLoading:true,errMessage:null,products:[]},action) =>{
    switch(action.type){
        case ActionTypes.ADD_PRODUCTS:
            return{...state,isLoading:false,products:action.payload};
        case ActionTypes.PRODUCTS_FAILED:
            return{...state,isLoading:false,errMessage:action.payload};
        case ActionTypes.PRODUCTS_LOADING:
            return state;
        default:
            return state;
    }
}






/*
        case ActionTypes.UPDATE_PRODUCT:
            if(state.products){
                for (let i in state.products){
                    if(state.products[i].sat_code == action.payload[0]){
                        state.products[i].supply = action.payload[1];
                    }
                }
            }
            else{
                return state;
            }
*/
//this.props.empleados.filter((person) => (person.Matricula == utilisitaeur && person.Contraseña == motdupas))[0];