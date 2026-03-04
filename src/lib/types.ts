
export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  barcode: string;
  description: string;
  category: string;
  imageUrl?: string;
  createdByUserId?: string;
  createdByUserName?: string;
  createdAt?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Staff {
  id: string;
  employeeCode: string;
  name: string;
  role: 'Admin' | 'Manager' | 'Cashier';
  active: boolean;
  email?: string;
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
