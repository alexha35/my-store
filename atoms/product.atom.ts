import { atom } from 'jotai';

import { Product } from '@/types/product';


export const originalProductsAtom = atom<Product[]>([]);

export const productsAtom = atom<Product[]>([]);
