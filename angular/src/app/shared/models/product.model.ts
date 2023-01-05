export interface Product {
  _id: string;
  name: string;
  img?: string;
  price: number;
  date?: Date;
  description: string;
  userId?: string;
  venteNb?: number;
  ajoutePn?: number;
  detailCheck?: number;
  category: Array<string>;
}
