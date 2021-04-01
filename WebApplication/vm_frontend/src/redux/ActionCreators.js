import * as ActionTypes from './ActionTypes';
import PRODUCTOS from '../DB/Products';
import {baseURL} from '../DB/baseURL';
import configureStore from './configureStore';

// // PRODUCT ACTION CREATORS

export const productsLoading = () => ({
    type:ActionTypes.PRODUCTS_LOADING
});

export const productsFailed = (errMessage) => ({
    type:ActionTypes.PRODUCTS_FAILED,
    payload:errMessage
});

export const addProducts = (products) => ({
    type:ActionTypes.ADD_PRODUCTS,
    payload:products
});

export const updateProducts = (sat_code,supply) =>({
    type: ActionTypes.UPDATE_PRODUCT,
    payload:[sat_code,supply]
});


export const fetchProducts = ()=>(dispatch)=>{
    dispatch(productsLoading(true));
    return fetch(baseURL+'products',{mode: 'cors'})
            .then(response=>{
                if (response.ok){
                    return response;
                }else{
                    
                    let error = new Error('Error '+response.status+": "+response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error=>{
                let errmess = new Error(error.message);
                throw errmess;
            })
            .then(response=>response.json())
            .then(products=>{dispatch(addProducts(products));console.log(products);})
            .catch(error=>dispatch(productsFailed(error.message)));

};// EMPLOYEE ACTION CREATORS


export const employeesLoading=()=>({
        type:ActionTypes.EMPLOYEES_LOADING
    });

export const employeesFailed = (errmess)=>({
        type:ActionTypes.EMPLOYEES_FAILED,
        payload:errmess
    });

export const addEmployees = (employees)=>({
            type:ActionTypes.ADD_EMPLOYEES,
            payload:employees
    });


export const fetchEmployees = ()=>(dispatch)=>{
    dispatch(employeesLoading(true));
    return fetch(baseURL+'employees',{mode: 'cors'})
            .then(response=>{
                if (response.ok){
                    return response;
                }else{
                    
                    let error = new Error('Error '+response.status+": "+response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error=>{
                let errmess = new Error(error.message);
                throw errmess;
            })
            .then(response=>response.json())
            .then(employees=>{dispatch(addEmployees(employees));console.log(employees);})
            .catch(error=>dispatch(employeesFailed(error.message)));

};




// USER AUTHENTICATION ACTION CREATORS

export const requestLogin = () =>({
    type:ActionTypes.USER_LOGIN_REQUEST
});

export const loginSuccess = (user) =>({
    type:ActionTypes.USER_LOGIN_SUCCESS,
    payload:user
});

export const loginFailure = (errMessage) =>({
    type:ActionTypes.USER_LOGIN_FAILURE,
    payload:errMessage
});

export const userLogout = () => ({
    type:ActionTypes.USER_LOGOUT
});


export const handleUserLogin = (username, password,users) => (dispatch) =>{

    dispatch(requestLogin(true));
    let user = users.filter((person) => (person.emp_id == username && person.password == password))[0];
    if(user){
        dispatch(loginSuccess(user));
    }else{
        dispatch(loginFailure("This user is not registered"));
    }
}
