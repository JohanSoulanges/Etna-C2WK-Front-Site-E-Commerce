export interface Panier {
  _id: string;
  idUser: string;
  products: [
    {
      productsId: string;
      quantity: number;
      price: number;
    }
  ];
  date: Date;
  status: number;
}
