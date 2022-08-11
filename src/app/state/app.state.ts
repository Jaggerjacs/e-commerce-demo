import { ActionReducerMap } from '@ngrx/store';
import { IProductState } from '../models/product.state';
import { productsReducer } from './reducers/product.reducer';

export interface AppState {
    productsState: IProductState;
    // shoppingCart: ReadonlyArray<string>;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    productsState: productsReducer,
};