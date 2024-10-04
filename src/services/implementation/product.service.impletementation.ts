import { Product } from "../../entities/product";
import type { ProductRepository } from "../../repositories/product/product.repository";
import { BuyOutputDto, type ListOutputDto, type ProductService, type SellOutputDto } from "../product/product.service";

export class ProductServiceImplemetentation implements ProductService {

  private constructor(readonly repository: ProductRepository) { }

  public static build(repository: ProductRepository) {
    return new ProductServiceImplemetentation(repository);
  }

  public async sell(id: string, amount: number): Promise<SellOutputDto> {
    const aProduct = await this.repository.find(id);

    if (!aProduct) {
      throw new Error(`O produto ${id} não foi encontrado`)
    }

    aProduct.sell(amount);

    await this.repository.update(aProduct);

    const output: SellOutputDto = {
      id: aProduct.id,
      balance: aProduct.quantity
    }
    return output;
  }
  public async buy(id: string, amount: number): Promise<BuyOutputDto> {
    const aProduct = await this.repository.find(id);

    if (!aProduct) {
      throw new Error(`O produto ${id} não foi encontrado`)
    }

    aProduct.increaseStock(amount);

    await this.repository.update(aProduct);

    const output: BuyOutputDto = {
      id: aProduct.id,
      balance: aProduct.quantity
    }
    return output;
  }
  public async list(): Promise<ListOutputDto> {
    const aProduct = await this.repository.list();

    const products = aProduct.map((products) => {
      return {
        id: products.id,
        name: products.name,
        price: products.price,
        balance: products.quantity

      }
    })

    const output: ListOutputDto = {
      products,
    };
    return output
  }
}