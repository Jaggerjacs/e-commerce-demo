import { createReducer, on } from '@ngrx/store';
import { ICartProductState } from '../../models/cart-product.state';
import { IProduct } from '../../models/product.interface';
import { addProduct, removeProduct } from '../actions/product.actions';


export const initialState: ICartProductState = { cartProducts: [], totalAmount: 0 };

export const cartProductsReducer = createReducer(
    initialState,
    on(addProduct, (state, { product }) => {
        let newProduct: IProduct;
        let newState = [...state.cartProducts];
        let totalAmount;
        let currentProduct = state.cartProducts.filter(el => el.id === product.id)[0];
        if (currentProduct) {
            newProduct = { ...product, qty: currentProduct.qty as number + product.qty };
            newState.splice(newState.indexOf(currentProduct), 1);
        } else {
            newProduct = { ...product };
        }
        newProduct.amount = newProduct.price * newProduct.qty;
        if (currentProduct && currentProduct.amount) {
            totalAmount = state.totalAmount + newProduct.amount - currentProduct.amount;
        } else {
            totalAmount = state.totalAmount + newProduct.amount;
        }
        return { ...state, cartProducts: [...[newProduct], ...newState], totalAmount };
    }),
    on(removeProduct, (state, { product }) => {
        let totalAmount = 0;
        let newState = [...state.cartProducts];
        newState.splice(newState.indexOf(product), 1);
        newState.forEach(el => {
            if (el.amount) {
                totalAmount = totalAmount + el.amount;
            }
        });
        return { ...state, cartProducts: [...newState], totalAmount };
    }),
);
