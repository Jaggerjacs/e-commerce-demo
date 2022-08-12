import { createReducer, on } from '@ngrx/store';
import { ICartProductState } from '../../models/cart-product.state';
import { IProduct } from '../../models/product.interface';
import { addProduct, removeProduct } from '../actions/product.actions';


export const initialState: ICartProductState = { cartProducts: [], totalAmount: 0 };

export const cartProductsReducer = createReducer(
    initialState,
    on(addProduct, (state, { product }) => {
        let newProduct: IProduct;
        let products = [...state.cartProducts];
        let totalAmount;
        let currentProduct = state.cartProducts.filter(el => el.id === product.id)[0];
        if (currentProduct) {
            // Calculate new product qty
            newProduct = { ...product, qty: currentProduct.qty as number + product.qty };
            products.splice(products.indexOf(currentProduct), 1);
        } else {
            newProduct = { ...product };
        }
        // Calculate product amount
        newProduct.amount = newProduct.price * newProduct.qty;
        // Sort product list
        const newState = [...[newProduct], ...products].sort((a, b) => {
            if (a.id > b.id) {
                return 1;
            }
            if (a.id < b.id) {
                return -1;
            }
            return 0;
        });
        //refresh totalAmount
        if (currentProduct && currentProduct.amount) {
            totalAmount = state.totalAmount + newProduct.amount - currentProduct.amount;
        } else {
            totalAmount = state.totalAmount + newProduct.amount;
        }
        return { ...state, cartProducts: [...newState], totalAmount };
    }),
    on(removeProduct, (state, { product }) => {
        let totalAmount = 0;
        let newState = [...state.cartProducts];
        newState.splice(newState.indexOf(product), 1);
        //refresh totalAmount
        newState.forEach(el => {
            if (el.amount) {
                totalAmount = totalAmount + el.amount;
            }
        });
        return { ...state, cartProducts: [...newState], totalAmount };
    }),
);
