export type SellOutputDto = {
  id: string;
  balance: number;
}

export type BuyOutputDto = {
  id: string;
  balance: number;
}

export type ListOutputDto = {
  products: {
    id: string;
    name: string;
    price: number;
    balance: number;
  }[];
}

export interface ProductService {
  sell(is: string, amount: number): Promise<SellOutputDto>
  buy(is: string, amount: number): Promise<BuyOutputDto>
  list(): Promise<ListOutputDto>;
}