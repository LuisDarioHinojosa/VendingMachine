import EMPLEADOS from '../DB/Empleados';


export const empleadosReducer = (state = EMPLEADOS,action) =>{
    switch(action.type){
        default:
            return state;
    }
}