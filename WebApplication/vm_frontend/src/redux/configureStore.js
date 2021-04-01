import {createStore,combineReducers,applyMiddleware} from 'redux';
import {empleadosReducer} from './empleadosReducer';
import {comprasReducer} from './comprasReducer';
import {productosReducer} from './productosReducer';
import {authenticationReducer} from './authenticationReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const configureStore = () =>{
    const store = createStore(
        combineReducers(
        {
            empleados:empleadosReducer,
            compras:comprasReducer,
            productos:productosReducer,
            authentication:authenticationReducer  
        }),
        applyMiddleware(thunk,logger));
    return store;
}


