
"use client"

import { useState, useEffect } from 'react';
import { Product, Order, Staff } from './types';
import { Language, translations } from './translations';
import { 
  useFirestore, 
  useCollection, 
  useMemoFirebase,
  addDocumentNonBlocking,
  updateDocumentNonBlocking,
  deleteDocumentNonBlocking,
  setDocumentNonBlocking
} from '@/firebase';
import { collection, query, orderBy, doc } from 'firebase/firestore';

export function useLanguage() {
  // ตั้งค่าเริ่มต้นเป็น 'th' (ภาษาไทย) ทันที
  const [lang, setLang] = useState<Language>('th');

  useEffect(() => {
    // ตรวจสอบว่าเคยเลือกภาษาอื่นไว้หรือไม่จาก localStorage
    const stored = typeof window !== 'undefined' ? localStorage.getItem('saleflow_lang') as Language : 'th';
    if (stored && (stored === 'en' || stored === 'th')) {
      setLang(stored);
    } else {
      // หากไม่มีการบันทึก ให้ใช้ภาษาไทยเป็นค่าเริ่มต้นและบันทึกลง localStorage
      localStorage.setItem('saleflow_lang', 'th');
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'th' : 'en';
    setLang(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('saleflow_lang', newLang);
    }
  };

  const t = translations[lang];
  return { lang, toggleLanguage, t };
}

export function useStaff() {
  const db = useFirestore();
  const staffQuery = useMemoFirebase(() => query(collection(db, 'userProfiles'), orderBy('name')), [db]);
  const { data: staffList, isLoading } = useCollection<Staff>(staffQuery);

  return {
    staffList: staffList || [],
    isLoading,
    addStaff: (s: Staff) => {
      const ref = doc(db, 'userProfiles', s.id || Math.random().toString(36).substr(2, 9));
      setDocumentNonBlocking(ref, { ...s, id: ref.id }, { merge: true });
    },
    deleteStaff: (id: string) => {
      const ref = doc(db, 'userProfiles', id);
      deleteDocumentNonBlocking(ref);
    }
  };
}

export function useInventory() {
  const db = useFirestore();
  const productsQuery = useMemoFirebase(() => query(collection(db, 'products'), orderBy('name')), [db]);
  const { data: products, isLoading } = useCollection<Product>(productsQuery);

  return {
    products: products || [],
    isLoading,
    addProduct: (p: Product) => {
      const ref = doc(collection(db, 'products'));
      setDocumentNonBlocking(ref, { ...p, id: ref.id }, { merge: true });
    },
    updateProduct: (p: Product) => {
      const ref = doc(db, 'products', p.id);
      updateDocumentNonBlocking(ref, p);
    },
    deleteProduct: (id: string) => {
      const ref = doc(db, 'products', id);
      deleteDocumentNonBlocking(ref);
    }
  };
}

export function useOrders() {
  const db = useFirestore();
  const ordersQuery = useMemoFirebase(() => query(collection(db, 'orders'), orderBy('date', 'desc')), [db]);
  const { data: orders, isLoading } = useCollection<Order>(ordersQuery);

  return {
    orders: orders || [],
    isLoading,
    addOrder: (o: Order) => {
      const ref = doc(db, 'orders', o.id);
      setDocumentNonBlocking(ref, o, { merge: true });
    },
    deleteOrder: (id: string) => {
      const ref = doc(db, 'orders', id);
      deleteDocumentNonBlocking(ref);
    }
  };
}
