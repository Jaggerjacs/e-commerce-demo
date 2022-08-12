import { IProduct } from '../../models/product.interface';
import { IProductState } from '../../models/product.state';
import { addQty, loadedProductList, loadProducts, subtractQty } from '../actions/product.actions';
import * as fromReducer from './product.reducer';

let product: IProduct = {
    id: 0,
    title: 'test',
    amount: 10,
    image: 'noImg',
    price: 10,
    qty: 1
};

describe('ProductsReducer', () => {
    describe('unknown action', () => {
        it('should return the default state', () => {
            const { initialState } = fromReducer;
            const action = {
                type: 'Unknown',
            };
            const state = fromReducer.productsReducer(initialState, action);
            expect(state).toBe(initialState);
        });
    });

    describe('loadProducts action', () => {
        it('should return load state', () => {
            const { initialState } = fromReducer;
            const newState: IProductState = {
                ...initialState,
                loading: true
            };
            const action = loadProducts();
            const state = fromReducer.productsReducer(initialState, action);
            expect(state).toEqual(newState);
            expect(state).not.toBe(initialState);
        });
    });

    describe('loadedProductList action', () => {
        it('should return loaded state', () => {
            const { initialState } = fromReducer;
            const newState: IProductState = {
                loading: false,
                products: [product]
            };
            const action = loadedProductList({ products: [product] });
            const state = fromReducer.productsReducer(initialState, action);
            expect(state).toEqual(newState);
            expect(state).not.toBe(initialState);
        });
    });

    describe('addQty action', () => {
        it('should return state with product qty modified', () => {
            const initialState: IProductState = {
                loading: false,
                products: [product]
            };
            const newState: IProductState = {
                loading: false,
                products: [{ ...product, qty: product.qty + 1 }]
            };
            const action = addQty({ product });
            const state = fromReducer.productsReducer(initialState, action);
            expect(state).toEqual(newState);
            expect(state).not.toBe(initialState);
        });
    });

    describe('subtractQty action', () => {
        it('should return state with qty product the same if qty is 1', () => {
            const initialState: IProductState = {
                loading: false,
                products: [product]
            };
            const action = subtractQty({ product });
            const state = fromReducer.productsReducer(initialState, action);
            expect(state).toEqual(initialState);
        });
        it('should return state with qty product - 1', () => {
            const productWithQty2 = { ...product, qty: 2 };
            const initialState: IProductState = {
                loading: false,
                products: [productWithQty2]
            };
            const newState: IProductState = {
                loading: false,
                products: [product]
            };
            const action = subtractQty({ product: productWithQty2 });
            const state = fromReducer.productsReducer(initialState, action);
            expect(state).toEqual(newState);
            expect(state).not.toBe(initialState);
        });
    });

});