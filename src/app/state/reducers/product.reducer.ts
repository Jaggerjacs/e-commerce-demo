import { createReducer, on } from '@ngrx/store';
import { IProductState } from '../../models/product.state';
import { loadProducts, loadedProductList, addQty, subtractQty } from '../actions/product.actions';


export const initialState: IProductState = { loading: false, products: [] };

export const productsReducer = createReducer(
    initialState,
    on(loadProducts, (state) => {
        return { ...state, loading: true };
    }),
    on(loadedProductList, (state, { products }) => {
        return { ...state, loading: false, products };
    }),
    on(addQty, (state, { product }) => {
        const newState = state.products.map(el => {
            if (el.id === product.id) {
                return { ...el, qty: product.qty + 1 }
            } else {
                return el;
            }
        });
        return { ...state, products: [...newState] };
    }),
    on(subtractQty, (state, { product }) => {
        const newState = state.products.map(el => {
            if (el.id === product.id && product.qty > 1) {
                return { ...el, qty: product.qty - 1 }
            } else {
                return el;
            }
        });
        return { ...state, products: [...newState] };
    }),
);

