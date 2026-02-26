
"use client"

import { useState, useEffect } from 'react';
import { Product, Order, CartItem, Staff } from './types';
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
    const stored = localStorage.getItem('saleflow_lang') as Language;
    if (stored) setLang(stored);
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'th' : 'en';
    setLang(newLang);
    localStorage.setItem('saleflow_lang', newLang);
  };

  const t = translations[lang];

  return { lang, toggleLanguage, t };
}

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<Staff | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('saleflow_current_user');
    if (stored) {
      setCurrentUser(JSON.parse(stored));
    } else {
      setCurrentUser(INITIAL_STAFF[0]);
    }
  }, []);

  const login = (staff: Staff) => {
    setCurrentUser(staff);
    localStorage.setItem('saleflow_current_user', JSON.stringify(staff));
  };

  return { currentUser, login };
}

export function useStaff() {
  const [staffList, setStaffList] = useState<Staff[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('saleflow_staff');
    if (stored) {
      setStaffList(JSON.parse(stored));
    } else {
      setStaffList(INITIAL_STAFF);
      localStorage.setItem('saleflow_staff', JSON.stringify(INITIAL_STAFF));
    }
  }, []);

  const addStaff = (staff: Staff) => {
    const updated = [...staffList, staff];
    setStaffList(updated);
    localStorage.setItem('saleflow_staff', JSON.stringify(updated));
  };

  const deleteStaff = (id: string) => {
    const updated = staffList.filter(s => s.id !== id);
    setStaffList(updated);
    localStorage.setItem('saleflow_staff', JSON.stringify(updated));
  };

  return { staffList, addStaff, deleteStaff };
}

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
