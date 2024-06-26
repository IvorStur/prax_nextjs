import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface Orders {
  id: Generated<number>;
  count: number;
  totalPrice: number;
}

export interface OrdersProducts {
  id: Generated<number>;
  orderId: number;
  productId: number;
  count: number;
  totalPrice: number;
}

export interface Products {
  id: Generated<number>;
  name: string;
  description: string;
  price: number;
}

export interface ProductsPhotos {
  id: Generated<number>;
  productId: number;
  url: string;
}

export interface ProductsReviews {
  id: Generated<number>;
  productId: number;
  rating: number;
  content: string | null;
  username: string | null;
}

export interface DB {
  orders: Orders;
  ordersProducts: OrdersProducts;
  products: Products;
  productsPhotos: ProductsPhotos;
  productsReviews: ProductsReviews;
}
