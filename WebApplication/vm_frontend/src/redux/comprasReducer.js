import COMPRAS from '../DB/Compras';


export const comprasReducer = (state = COMPRAS,action) =>{
    switch(action.type){
        default:
            return state;
    }
}