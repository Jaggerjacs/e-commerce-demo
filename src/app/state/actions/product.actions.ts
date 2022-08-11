import { createAction, props } from '@ngrx/store';
import { IProduct } from '../../models/product.interface';


export const loadProducts = createAction(
    '[Product List] Load products',
);

export const loadedProductList = createAction(
    '[Product List] Loaded success',
    props<{ products: IProduct[] }>()
);

export const addProduct = createAction(
    '[Product List] Add Product',
    props<{ id: string }>()
);

export const removeProduct = createAction(
    '[Product Cart Collection] Remove Product',
    props<{ id: string }>()
);
