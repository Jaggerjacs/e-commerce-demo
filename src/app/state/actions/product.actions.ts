import { createAction, props } from '@ngrx/store';
import { IProduct } from '../../models/product.interface';

export enum ProductActions {
    LOAD_PRODUCTS = '[Product List] Load products',
    LOADED_PRODUCTS = '[Product List] Loaded success',
    ADD_QTY = '[Product] Add Qty',
    SUBTRACT_QTY = '[Product] Subtract Qty',
    ADD_PRODUCT = '[Product List] Add Product',
    REMOVE_PRODUCT = '[Product List] Remove Product',
}

export const loadProducts = createAction(
    ProductActions.LOAD_PRODUCTS,
);

export const loadedProductList = createAction(
    ProductActions.LOADED_PRODUCTS,
    props<{ products: IProduct[] }>()
);

export const addQty = createAction(
    ProductActions.ADD_QTY,
    props<{ product: IProduct }>()
);

export const subtractQty = createAction(
    ProductActions.SUBTRACT_QTY,
    props<{ product: IProduct }>()
);

export const addProduct = createAction(
    ProductActions.ADD_PRODUCT,
    props<{ product: IProduct }>()
);

export const removeProduct = createAction(
    ProductActions.REMOVE_PRODUCT,
    props<{ product: IProduct }>()
);
