export interface Product {
  id: number;
  title: string;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
  price: number;
}
