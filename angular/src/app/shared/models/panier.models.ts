export interface Panier {
    _id: string;
    productId: [
        {
            productId: string;
            quantity: number;
        }
    ];
    date: Date;
    status: number;
}