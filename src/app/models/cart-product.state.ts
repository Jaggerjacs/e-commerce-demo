import { IProduct } from "./product.interface";

export interface ICartProductState {
    totalAmount: number;
    cartProducts: Array<IProduct>;
}