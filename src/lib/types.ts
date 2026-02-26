
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

export interface Staff {
  id: string;
  name: string;
  role: 'Admin' | 'Sales';
  active: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  total: number;
  cashierId: string;
  cashierName: string;
}
