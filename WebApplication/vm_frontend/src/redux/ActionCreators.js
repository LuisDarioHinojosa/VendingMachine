import * as ActionTypes from './ActionTypes';
import PRODUCTOS from '../DB/Products';


export const fetchProducts = () => (dispatch) => {
    dispatch(productsLoading(true));
    setTimeout(() => {
        dispatch(addProducts(PRODUCTOS));
    }, 2000);
}

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

