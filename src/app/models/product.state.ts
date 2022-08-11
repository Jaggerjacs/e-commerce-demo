import { IProduct } from "./product.interface";

export interface IProductState {
    loading: boolean;
    products: ReadonlyArray<IProduct>;
}