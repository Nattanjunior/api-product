import { Product } from "../../entities/product"

export interface ProductRepository {
  save(product: Product): Promise<void>;
  list(): Promise<Product[]>;
}