
"use client"

import { useState, useEffect } from 'react';
import { Product, Order, Staff } from './types';
import { PlaceHolderImages } from './placeholder-images';
import { Language, translations } from './translations';

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

// NOTE: Auth logic moved to Firebase Hooks in components. 
// This remains for legacy compatibility with other pages if needed.
export function useStaff() {
  const [staffList, setStaffList] = useState<Staff[]>([]);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('saleflow_staff') : null;
    if (stored) {
      setStaffList(JSON.parse(stored));
    } else {
      setStaffList(INITIAL_STAFF);
      if (typeof window !== 'undefined') localStorage.setItem('saleflow_staff', JSON.stringify(INITIAL_STAFF));
    }
  }, []);

  const addStaff = (staff: Staff) => {
    const updated = [...staffList, staff];
    setStaffList(updated);
    if (typeof window !== 'undefined') localStorage.setItem('saleflow_staff', JSON.stringify(updated));
  };

  const deleteStaff = (id: string) => {
    const updated = staffList.filter(s => s.id !== id);
    setStaffList(updated);
    if (typeof window !== 'undefined') localStorage.setItem('saleflow_staff', JSON.stringify(updated));
  };

  return { staffList, addStaff, deleteStaff };
}

export function useInventory() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('saleflow_products') : null;
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      setProducts(INITIAL_PRODUCTS);
      if (typeof window !== 'undefined') localStorage.setItem('saleflow_products', JSON.stringify(INITIAL_PRODUCTS));
    }
  }, []);

  const addProduct = (product: Product) => {
    const updated = [...products, product];
    setProducts(updated);
    if (typeof window !== 'undefined') localStorage.setItem('saleflow_products', JSON.stringify(updated));
  };

  const updateProduct = (product: Product) => {
    const updated = products.map(p => p.id === product.id ? product : p);
    setProducts(updated);
    if (typeof window !== 'undefined') localStorage.setItem('saleflow_products', JSON.stringify(updated));
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    if (typeof window !== 'undefined') localStorage.setItem('saleflow_products', JSON.stringify(updated));
  };

  return { products, addProduct, updateProduct, deleteProduct };
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('saleflow_orders') : null;
    if (stored) {
      setOrders(JSON.parse(stored));
    }
  }, []);

  const addOrder = (order: Order) => {
    const updated = [order, ...orders];
    setOrders(updated);
    if (typeof window !== 'undefined') localStorage.setItem('saleflow_orders', JSON.stringify(updated));
  };

  return { orders, addOrder };
}
