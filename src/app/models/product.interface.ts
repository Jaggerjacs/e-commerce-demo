export interface IProduct {
    id: number;
    title: string;
    image: string;
    price: number;
    qty: number;
    amount: number;
}

export interface ICartProduct {
    id: number;
    title?: string;
    image?: string;
    price?: number;
    qty?: number;
    amount?: number;
}