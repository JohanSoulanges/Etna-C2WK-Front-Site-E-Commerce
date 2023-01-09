export interface Panier {
  _id: string;
  idUser: string;
  products: [
    {
      productId: string;
      quantity: number;
      price: number;
    }
  ];
  date: Date;
  totalPrice: number;
  status: number;
}
