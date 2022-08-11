import { createAction, props } from '@ngrx/store';
import { ICartProduct, IProduct } from '../../models/product.interface';


export const loadProducts = createAction(
    '[Product List] Load products',
);

export const loadedProductList = createAction(
    '[Product List] Loaded success',
    props<{ products: IProduct[] }>()
);

export const addQty = createAction(
    '[Product] Add Qty',
    props<{ product: IProduct }>()
);

export const sustractQty = createAction(
    '[Product] Sustract Qty',
    props<{ product: IProduct }>()
);

export const addProduct = createAction(
    '[Product List] Add Product',
    props<{ product: IProduct }>()
);

export const removeProduct = createAction(
    '[Product List] Remove Product',
    props<{ product: IProduct }>()
);
