import { ICartProductState } from '../../models/cart-product.state';
import { IProduct } from '../../models/product.interface';
import { addProduct, removeProduct } from '../actions/product.actions';
import * as fromReducer from './cart-product.reducer';

let product: IProduct = {
    id: 0,
    title: 'test',
    amount: 10,
    image: '',
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
            const state = fromReducer.cartProductsReducer(initialState, action);
            expect(state).toBe(initialState);
        });
    });

    describe('addProduct action', () => {
        it('should return state with product added and refresh totalAmount', () => {
            const initialState: ICartProductState = {
                cartProducts: [],
                totalAmount: 0
            }
            const newState: ICartProductState = {
                cartProducts: [product],
                totalAmount: 10
            };
            const action = addProduct({ product });
            const state = fromReducer.cartProductsReducer(initialState, action);
            expect(state).toEqual(newState);
            expect(state).not.toBe(initialState);
        });

        it('should return state with qty product and totalAmount refreshed on add existing product', () => {
            const initialState: ICartProductState = {
                cartProducts: [product],
                totalAmount: 10
            }
            const newState: ICartProductState = {
                cartProducts: [{ ...product, amount: 20, qty: 2 }],
                totalAmount: 20
            };
            const action = addProduct({ product });
            const state = fromReducer.cartProductsReducer(initialState, action);
            expect(state).toEqual(newState);
            expect(state).not.toBe(initialState);
        });

        it('should return state with product list and totalAmount refreshed adding new product', () => {
            const newProduct = { ...product, id: 1 };
            const initialState: ICartProductState = {
                cartProducts: [product],
                totalAmount: 10
            }
            const newState: ICartProductState = {
                cartProducts: [product, newProduct],
                totalAmount: 20
            };
            const action = addProduct({ product: newProduct });
            const state = fromReducer.cartProductsReducer(initialState, action);
            expect(state).toEqual(newState);
            expect(state).not.toBe(initialState);
        });

        it('should return state with product amount and product qty refreshed on adding existing product', () => {
            const initialState: ICartProductState = {
                cartProducts: [product],
                totalAmount: 10
            }
            const newState: ICartProductState = {
                cartProducts: [{ ...product, amount: 30, qty: 3 }],
                totalAmount: 30
            };
            const action = addProduct({ product: { ...product, qty: 2 } });
            const state = fromReducer.cartProductsReducer(initialState, action);
            expect(state).toEqual(newState);
            expect(state).not.toBe(initialState);
        });
    });

    describe('removeProduct action', () => {
        it('should return state with empty product list and refresh totalAmount on remove last product', () => {
            const initialState: ICartProductState = {
                cartProducts: [product],
                totalAmount: 10
            }
            const newState: ICartProductState = {
                cartProducts: [],
                totalAmount: 0
            };
            const action = removeProduct({ product });
            const state = fromReducer.cartProductsReducer(initialState, action);
            expect(state).toEqual(newState);
            expect(state).not.toBe(initialState);
        });

        it('should refresh product list and totalAmount on remove product', () => {
            const initialState: ICartProductState = {
                cartProducts: [product, { ...product, id: 1 }],
                totalAmount: 20
            }
            const newState: ICartProductState = {
                cartProducts: [product],
                totalAmount: 10
            };
            const action = removeProduct({ product: { ...product, id: 1 } });
            const state = fromReducer.cartProductsReducer(initialState, action);
            expect(state).toEqual(newState);
            expect(state).not.toBe(initialState);
        });
    });

});