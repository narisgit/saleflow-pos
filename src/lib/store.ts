
"use client"

import { useState, useEffect } from 'react';
import { Product, Order, Staff } from './types';
import { PlaceHolderImages } from './placeholder-images';
import { Language, translations } from './translations';

// --- ROBUST GLOBAL STORE SINGLETON ---
class SaleFlowStore {
  orders: Order[] = [];
  products: Product[] = [];
  staff: Staff[] = [];
  listeners: Set<() => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      const sOrders = localStorage.getItem('saleflow_orders');
      if (sOrders) this.orders = JSON.parse(sOrders);

      const sProducts = localStorage.getItem('saleflow_products');
      if (sProducts) {
        this.products = JSON.parse(sProducts);
      } else {
        this.products = [
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
          }
        ];
      }

      const sStaff = localStorage.getItem('saleflow_staff');
      if (sStaff) {
        this.staff = JSON.parse(sStaff);
      } else {
        this.staff = [
          { id: 's1', name: 'Somchai', role: 'Admin', active: true },
          { id: 's2', name: 'Somsri', role: 'Sales', active: true }
        ];
      }
    }
  }

  subscribe(l: () => void) {
    this.listeners.add(l);
    return () => this.listeners.delete(l);
  }

  notify() {
    this.listeners.forEach(l => l());
  }

  save() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('saleflow_orders', JSON.stringify(this.orders));
      localStorage.setItem('saleflow_products', JSON.stringify(this.products));
      localStorage.setItem('saleflow_staff', JSON.stringify(this.staff));
    }
    this.notify();
  }
}

const globalStore = new SaleFlowStore();

export function useLanguage() {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('saleflow_lang') as Language : 'en';
    if (stored) setLang(stored);
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'th' : 'en';
    setLang(newLang);
    if (typeof window !== 'undefined') localStorage.setItem('saleflow_lang', newLang);
  };

  const t = translations[lang];
  return { lang, toggleLanguage, t };
}

export function useStaff() {
  const [staffList, setStaffList] = useState<Staff[]>(globalStore.staff);

  useEffect(() => {
    return globalStore.subscribe(() => setStaffList([...globalStore.staff]));
  }, []);

  return {
    staffList,
    addStaff: (s: Staff) => { globalStore.staff = [...globalStore.staff, s]; globalStore.save(); },
    deleteStaff: (id: string) => { globalStore.staff = globalStore.staff.filter(s => s.id !== id); globalStore.save(); }
  };
}

export function useInventory() {
  const [products, setProducts] = useState<Product[]>(globalStore.products);

  useEffect(() => {
    return globalStore.subscribe(() => setProducts([...globalStore.products]));
  }, []);

  return {
    products,
    addProduct: (p: Product) => { globalStore.products = [...globalStore.products, p]; globalStore.save(); },
    updateProduct: (p: Product) => { globalStore.products = globalStore.products.map(i => i.id === p.id ? p : i); globalStore.save(); },
    deleteProduct: (id: string) => { globalStore.products = globalStore.products.filter(p => p.id !== id); globalStore.save(); }
  };
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>(globalStore.orders);

  useEffect(() => {
    return globalStore.subscribe(() => setOrders([...globalStore.orders]));
  }, []);

  return {
    orders,
    addOrder: (o: Order) => { globalStore.orders = [o, ...globalStore.orders]; globalStore.save(); },
    deleteOrder: (id: string) => { globalStore.orders = globalStore.orders.filter(o => o.id !== id); globalStore.save(); }
  };
}
