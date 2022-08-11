import { ActionReducerMap } from '@ngrx/store';
import { ICartProductState } from '../models/cart-product.state';
import { ICartProduct, IProduct } from '../models/product.interface';
import { IProductState } from '../models/product.state';
import { cartProductsReducer } from './reducers/cart-product.reducer';
import { productsReducer } from './reducers/product.reducer';

export interface AppState {
    productsState: IProductState;
    cartProductsState: ICartProductState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    productsState: productsReducer,
    cartProductsState: cartProductsReducer,
};