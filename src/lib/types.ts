
export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  barcode: string;
  description: string;
  category: string;
  imageUrl?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  total: number;
}
