'use client';

import { useAtomValue, useSetAtom } from 'jotai';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// import { PaymentElement, LinkAuthenticationElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import styles from './cart.module.css';
import { cartAtom, changeItemCount, removeCartItem } from '@/atoms/cart.atom';
import ProductInfo from '@/components/product-info/ProductInfo';
import { AiOutlineDelete } from 'react-icons/ai';
import { CartProduct } from '@/types/cart';
import getStripe from '@/utils/get-stripe';
import CheckoutForm from '@/components/checkout/Checkout';

const stripePromise = getStripe();

export default function page() {
	const cart = useAtomValue(cartAtom);
	const updateQuantity = useSetAtom(changeItemCount);
	const removeItem = useSetAtom(removeCartItem);
	const cartProducts = Array.from(cart.cart.values());
	const [clientSecret, setClientSecret] = useState<string>('');

	useEffect(() => {
		const getCS = async () => {
			getStripe();
			const checkoutSession: any = await fetch('/api/checkout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ products: cartProducts }),
			});
			const data = await checkoutSession.json();
			setClientSecret(data.clientSecret);
		};

		getCS();
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.card_container_base}>
				<h2>Checkout</h2>
				{clientSecret && (
					<Elements
						options={{
							clientSecret,
						}}
						stripe={stripePromise}>
						<CheckoutForm />
					</Elements>
				)}
			</div>
			<div className={`${styles.card_container_base} ${styles.summary_container}`}>
				<h2>Summary</h2>
				<div className={styles.productsContainer}>
					{Array.from(cart.cart.keys()).map((id: number) => {
						const item: CartProduct | undefined = cart.cart.get(id);
						const itemPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(item?.price));
						const itemTotalPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(item?.price) * Number(item?.quantity));

						return (
							item && (
								<div className={styles.item_row} key={item.id}>
									<Image height={100} width={100} src={item.image} alt={item.title} />
									<div className={styles.info_container}>
										<div className={styles.title_price}>
											<h4 className={styles.item_title}>{item.title}</h4>
											<h4>{itemTotalPrice}</h4>
										</div>
										<div className={styles.price_stock}>
											<p>{itemPrice}</p>
											<p className={styles.in_stock}>In Stock</p>
										</div>
										<div className={styles.actions_container}>
											<ProductInfo.Quantity
												minusOnClick={() => updateQuantity({ product: item, type: 'decrement' })}
												plusOnClick={() => updateQuantity({ product: item, type: 'increment' })}
												quantity={item.quantity}
											/>
											<button className={styles.button} onClick={() => removeItem(item)}>
												<div className={styles.delete_container}>
													<AiOutlineDelete />
													Delete
												</div>
											</button>
										</div>
									</div>
								</div>
							)
						);
					})}
				</div>
				<div className={styles.summary_bottom_container}>
					<div className={styles.summary_bottom_item}>
						<p className={styles.summary_title}>Subtotal</p>
						<h4>${cart.totalPrice.toFixed(2)}</h4>
					</div>
					<div className={styles.summary_bottom_item}>
						<p className={styles.summary_title}>Tax</p>
						<h4>--</h4>
					</div>
				</div>
			</div>
		</div>
	);
}
