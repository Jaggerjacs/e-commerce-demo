import { ICartProduct } from "./product.interface";

export interface ICartProductState {
    totalAmount: number;
    cartProducts: Array<ICartProduct>;
}