import { atom } from 'jotai';

import { Cart, CartProduct } from '@/types/cart';
import { Categories, Product } from '@/types/product';

const cartMap = new Map<number, CartProduct>();
// cartMap.set(19, {
// 	id: 19,
// 	title: "Opna Women's Short Sleeve Moisture",
// 	price: '7.95',
// 	description:
// 		'100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort',
// 	category: Categories.MENS_CLOTHING,
// 	image: 'https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg',
// 	rating: { rate: 4.5, count: 146 },
// 	quantity: 2,
// });

// cartMap.set(20, {
// 	id: 20,
// 	title: 'DANVOUY Womens T Shirt Casual Cotton Short',
// 	price: '12.99',
// 	description:
// 		'95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.',
// 	category: Categories.MENS_CLOTHING,
// 	image: 'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg',
// 	rating: { rate: 3.6, count: 145 },
// 	quantity: 1,
// });

export const cartAtom = atom({ cart: cartMap, itemCount: 0, totalPrice: 0.0 });

export const addCartItem = atom(null, (get, set, update: { product: Product; itemCount: number }) => {
	const currentCart = get(cartAtom);
	const grabItemFromCart = currentCart.cart.get(update.product.id);
	currentCart.cart.set(update.product.id, { ...update.product, quantity: grabItemFromCart ? update.itemCount + grabItemFromCart.quantity : update.itemCount });

	set(cartAtom, { cart: currentCart.cart, itemCount: currentCart.itemCount + update.itemCount, totalPrice: currentCart.totalPrice + Number(update.product.price) * update.itemCount });
});

export const removeCartItem = atom(null, (get, set, update: Product) => {
	const currentCart = get(cartAtom);

	const grabItemFromCart = currentCart.cart.get(update.id);
	const itemFromCartQuantity = grabItemFromCart?.quantity;

	grabItemFromCart && currentCart.cart.delete(update.id);
	set(cartAtom, {
		cart: currentCart.cart,
		itemCount: itemFromCartQuantity ? currentCart.itemCount - itemFromCartQuantity : currentCart.itemCount,
		totalPrice: itemFromCartQuantity ? currentCart.totalPrice - Number(update.price) * itemFromCartQuantity : currentCart.totalPrice - Number(update.price) * 1,
	});
});

export const changeItemCount = atom(null, (get, set, update: { product: Product; type: string }) => {
	const currentCart = get(cartAtom);
	const grabItemFromCart = currentCart.cart.get(update.product.id);

	switch (update.type) {
		case 'increment': {
			const itemFromCartQuantity = grabItemFromCart ? grabItemFromCart?.quantity + 1 : grabItemFromCart;
			const modifiedItemFromCart = { ...update.product, quantity: itemFromCartQuantity ? itemFromCartQuantity : 0 };
			modifiedItemFromCart.id && currentCart.cart.set(modifiedItemFromCart.id, modifiedItemFromCart);
			set(cartAtom, {
				cart: currentCart.cart,
				itemCount: itemFromCartQuantity ? currentCart.itemCount + 1 : currentCart.itemCount,
				totalPrice: currentCart.totalPrice + Number(update.product.price),
			});
			return;
		}
		case 'decrement': {
			const itemFromCartQuantity = grabItemFromCart ? grabItemFromCart?.quantity - 1 : grabItemFromCart;
			const modifiedItemFromCart = { ...update.product, quantity: itemFromCartQuantity ? itemFromCartQuantity : 0 };
			modifiedItemFromCart.id && currentCart.cart.set(modifiedItemFromCart.id, modifiedItemFromCart);
			set(cartAtom, {
				cart: currentCart.cart,
				itemCount: itemFromCartQuantity ? currentCart.itemCount - 1 : currentCart.itemCount,
				totalPrice: currentCart.totalPrice - Number(update.product.price),
			});
			return;
		}
		default:
			break;
	}
});

export const clearCart = atom(null, (get, set) => {
	const currentCart = get(cartAtom).cart;
	currentCart.clear();
	set(cartAtom, { cart: currentCart, itemCount: 0, totalPrice: 0.0 });
});
