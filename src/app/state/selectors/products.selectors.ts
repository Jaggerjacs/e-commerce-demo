import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ICartProductState } from '../../models/cart-product.state';
import { ICartProduct, IProduct } from '../../models/product.interface';
import { IProductState } from '../../models/product.state';
import { AppState } from '../app.state';
import { productsReducer } from '../reducers/product.reducer';


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

// export const selectProductQty = createSelector(
//     selectProductsFeature,
//     (state: any) => state
// );

export const selectCartProductsFeature = (state: AppState) => state.cartProductsState;
// export const selectCartProductsFeature = createFeatureSelector<ReadonlyArray<IProduct>>('cartProductsState');

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