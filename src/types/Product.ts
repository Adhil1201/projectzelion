export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'bat' | 'ball' | 'equipment' | 'kit';
  inStock: boolean;
  rating: number;
  reviews: number;
  features: string[];
  discount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}