
"use client"

import { useState, useEffect } from 'react';
import { Product, Order, Staff } from './types';
import { PlaceHolderImages } from './placeholder-images';
import { Language, translations } from './translations';

// --- INITIAL DATA ---
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
  }
];

const INITIAL_STAFF: Staff[] = [
  { id: 's1', name: 'Somchai', role: 'Admin', active: true },
  { id: 's2', name: 'Somsri', role: 'Sales', active: true }
];

// --- SHARED GLOBAL STATE (Simplified) ---
let globalOrders: Order[] = [];
let globalProducts: Product[] = [];
let globalStaff: Staff[] = [];
let listeners: Array<() => void> = [];

const notify = () => listeners.forEach(l => l());

// Helper to sync from LocalStorage once
if (typeof window !== 'undefined') {
  const sOrders = localStorage.getItem('saleflow_orders');
  if (sOrders) globalOrders = JSON.parse(sOrders);

  const sProducts = localStorage.getItem('saleflow_products');
  globalProducts = sProducts ? JSON.parse(sProducts) : INITIAL_PRODUCTS;

  const sStaff = localStorage.getItem('saleflow_staff');
  globalStaff = sStaff ? JSON.parse(sStaff) : INITIAL_STAFF;
}

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
  const [staffList, setStaffList] = useState<Staff[]>(globalStaff);

  useEffect(() => {
    const l = () => setStaffList([...globalStaff]);
    listeners.push(l);
    return () => { listeners = listeners.filter(i => i !== l); };
  }, []);

  const addStaff = (staff: Staff) => {
    globalStaff = [...globalStaff, staff];
    localStorage.setItem('saleflow_staff', JSON.stringify(globalStaff));
    notify();
  };

  const deleteStaff = (id: string) => {
    globalStaff = globalStaff.filter(s => s.id !== id);
    localStorage.setItem('saleflow_staff', JSON.stringify(globalStaff));
    notify();
  };

  return { staffList, addStaff, deleteStaff };
}

export function useInventory() {
  const [products, setProducts] = useState<Product[]>(globalProducts);

  useEffect(() => {
    const l = () => setProducts([...globalProducts]);
    listeners.push(l);
    return () => { listeners = listeners.filter(i => i !== l); };
  }, []);

  const addProduct = (product: Product) => {
    globalProducts = [...globalProducts, product];
    localStorage.setItem('saleflow_products', JSON.stringify(globalProducts));
    notify();
  };

  const updateProduct = (product: Product) => {
    globalProducts = globalProducts.map(p => p.id === product.id ? product : p);
    localStorage.setItem('saleflow_products', JSON.stringify(globalProducts));
    notify();
  };

  const deleteProduct = (id: string) => {
    globalProducts = globalProducts.filter(p => p.id !== id);
    localStorage.setItem('saleflow_products', JSON.stringify(globalProducts));
    notify();
  };

  return { products, addProduct, updateProduct, deleteProduct };
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>(globalOrders);

  useEffect(() => {
    const l = () => setOrders([...globalOrders]);
    listeners.push(l);
    return () => { listeners = listeners.filter(i => i !== l); };
  }, []);

  const addOrder = (order: Order) => {
    globalOrders = [order, ...globalOrders];
    localStorage.setItem('saleflow_orders', JSON.stringify(globalOrders));
    notify();
  };

  const deleteOrder = (id: string) => {
    globalOrders = globalOrders.filter(o => o.id !== id);
    localStorage.setItem('saleflow_orders', JSON.stringify(globalOrders));
    notify();
  };

  return { orders, addOrder, deleteOrder };
}
