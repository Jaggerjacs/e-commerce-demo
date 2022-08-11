import { createSelector } from '@ngrx/store';
import { ICartProductState } from '../../models/cart-product.state';
import { IProductState } from '../../models/product.state';
import { AppState } from '../app.state';


export const selectProductsFeature = (state: AppState) => state.productsState;

export const selectProductList = createSelector(
    selectProductsFeature,
    (state: IProductState) => {
        return state.products;
    }
);

export const selectLoading = createSelector(
    selectProductsFeature,
    (state: IProductState) => state.loading
);

export const selectCartProductsFeature = (state: AppState) => state.cartProductsState;

export const selectCartProductList = createSelector(
    selectCartProductsFeature,
    (state: ICartProductState) => {
        return state.cartProducts;
    }
);

export const selectTotalAmount = createSelector(
    selectCartProductsFeature,
    (state: ICartProductState) => {
        return state.totalAmount;
    }
);