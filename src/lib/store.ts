
"use client"

import { useState, useEffect } from 'react';
import { Product, Order, CartItem } from './types';
import { PlaceHolderImages } from './placeholder-images';

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Espresso Coffee',
    price: 4.50,
    stock: 50,
    barcode: '1234567890123',
    description: 'Freshly roasted premium espresso beans.',
    category: 'Beverages',
    imageUrl: PlaceHolderImages[0].imageUrl
  },
  {
    id: '2',
    name: 'Artisan Bread',
    price: 6.00,
    stock: 24,
    barcode: '9876543210987',
    description: 'Slow-fermented sourdough artisan bread.',
    category: 'Bakery',
    imageUrl: PlaceHolderImages[2].imageUrl
  },
  {
    id: '3',
    name: 'Green Tea',
    price: 3.50,
    stock: 100,
    barcode: '1111222233334',
    description: 'Refreshing organic green tea from the hills.',
    category: 'Beverages',
    imageUrl: PlaceHolderImages[1].imageUrl
  }
];

export function useInventory() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('saleflow_products');
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      setProducts(INITIAL_PRODUCTS);
      localStorage.setItem('saleflow_products', JSON.stringify(INITIAL_PRODUCTS));
    }
  }, []);

  const addProduct = (product: Product) => {
    const updated = [...products, product];
    setProducts(updated);
    localStorage.setItem('saleflow_products', JSON.stringify(updated));
  };

  const updateProduct = (product: Product) => {
    const updated = products.map(p => p.id === product.id ? product : p);
    setProducts(updated);
    localStorage.setItem('saleflow_products', JSON.stringify(updated));
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem('saleflow_products', JSON.stringify(updated));
  };

  return { products, addProduct, updateProduct, deleteProduct };
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('saleflow_orders');
    if (stored) {
      setOrders(JSON.parse(stored));
    }
  }, []);

  const addOrder = (order: Order) => {
    const updated = [order, ...orders];
    setOrders(updated);
    localStorage.setItem('saleflow_orders', JSON.stringify(updated));
  };

  return { orders, addOrder };
}
