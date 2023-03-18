'use client';
import { useSetAtom } from 'jotai';
import { useState } from 'react';

import { addCartItem } from '@/atoms/cart.atom';
import { Product } from '@/types/product';
import Rating from '../rating/Rating';
import styles from './product-info.module.css';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';

interface ProductInfoInterface {
	title?: {
		class?: string;
		disable?: boolean;
		productCard?: boolean;
	};
	description?: {
		class?: string;
		disable?: boolean;
	};
	rating?: {
		class?: string;
		disable?: boolean;
	};
	price?: {
		class?: string;
		disable?: boolean;
	};
	quantity?: {
		class?: string;
		disable?: boolean;
	};
	cta?: {
		class?: string;
		disable?: boolean;
	};
}

export default function ProductInfo({ product, config = {} }: { product: Product; config?: ProductInfoInterface }) {
	const setCart = useSetAtom(addCartItem);
	const [itemQuantity, setItemQuantity] = useState<number>(1);

	return (
		<div className={styles.info_container}>
			{!config?.title?.disable && <h3 className={`${config?.title?.productCard && styles.title} ${config?.title?.class}`}>{product.title}</h3>}
			{!config?.description?.disable && <p>{product.description}</p>}
			<div className={styles.bottom_container}>
				{!config?.rating?.disable && <Rating rating={product.rating} />}
				{!config?.price?.disable && <p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(product.price))}</p>}
				{!config?.quantity?.disable && (
					<div className={styles.quantity_container}>
						<span>Quantity</span>
						<ProductInfo.Quantity minusOnClick={() => setItemQuantity(itemQuantity - 1)} plusOnClick={() => setItemQuantity(itemQuantity + 1)} quantity={itemQuantity} />
					</div>
				)}
				{/* <p className='text'>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(product.price))}</p> */}
				{!config?.cta?.disable && (
					<button className={`primary-cta ${styles.cta}`} onClick={() => setCart({ product, itemCount: itemQuantity })}>
						Add to cart
					</button>
				)}
			</div>
		</div>
	);
}

ProductInfo.Quantity = function ({ minusOnClick, plusOnClick, quantity }: { minusOnClick: () => void; plusOnClick: () => void; quantity: number }) {
	return (
		<div className={styles.quantity_input_container}>
			<AiOutlineMinusCircle
				className={styles.button}
				onClick={() => {
					if (quantity <= 1) return;
					minusOnClick();
				}}
			/>
			<span>{quantity}</span>
			<AiOutlinePlusCircle
				className={styles.button}
				onClick={() => {
					plusOnClick();
				}}
			/>
		</div>
	);
};
