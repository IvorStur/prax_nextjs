import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

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
  products: Products;
  productsPhotos: ProductsPhotos;
  productsReviews: ProductsReviews;
}
