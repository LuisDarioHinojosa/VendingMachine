import {createStore,combineReducers} from 'redux';
import {empleadosReducer} from './empleadosReducer';
import {comprasReducer} from './comprasReducer';
import {productosReducer} from './productosReducer';

export const configureStore = () =>{
    const store = createStore(
        combineReducers(
        {
            empleados:empleadosReducer,
            compras:comprasReducer,
            productos:productosReducer    
        }));
    return store;
}


