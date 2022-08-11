import { createSelector } from '@ngrx/store';
import { IProductState } from '../../models/product.state';
import { AppState } from '../app.state';


export const selectProductsFeature = (state: AppState) => state.productsState;

export const selectProductList = createSelector(
    selectProductsFeature,
    (state: IProductState) => state.products
);

export const selectLoading = createSelector(
    selectProductsFeature,
    (state: IProductState) => state.loading
);