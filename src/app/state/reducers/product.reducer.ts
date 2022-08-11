import { createReducer, on } from '@ngrx/store';
import { IProductState } from '../../models/product.state';
import { loadProducts, loadedProductList } from '../actions/product.actions';


export const initialState: IProductState = { loading: false, products: [] };

export const productsReducer = createReducer(
    initialState,
    on(loadProducts, (state) => {
        return { ...state, loading: true };
    }),
    on(loadedProductList, (state, { products }) => {
        return { ...state, loading: false, products };
    }),
);

