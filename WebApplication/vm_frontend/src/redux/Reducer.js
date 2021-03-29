// this is where the state will be set up
import PRODUCTOS from '../DB/Products';
import EMPLEADOS from '../DB/Empleados';
import COMPRAS from '../DB/Compras';
import { Redirect } from 'react-router';

export const initialState = {
    productos: PRODUCTOS,
    empleados:EMPLEADOS,
    compras:COMPRAS
}

export const Reducer = (state,action) =>{
    if(typeof(state) == 'undefined'){
        return initialState;
    }
    return state;
}

