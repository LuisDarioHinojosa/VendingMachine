import PRODUCTOS from '../DB/Products';


export const productosReducer = (state = PRODUCTOS,action) =>{
    switch(action.type){
        default:
            return state;
    }
}