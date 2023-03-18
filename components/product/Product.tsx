'use client';

import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineStar } from 'react-icons/ai';
import { useAtom } from 'jotai';

import styles from './product.module.css';
import { Product as ProductInterface } from '@/types/product';
import { cartAtom, addCartItem } from '@/atoms/cart.atom';
import Rating from '../rating/Rating';
import ProductInfo from '../product-info/ProductInfo';

export default function Product({ product, loading }: { product: ProductInterface | null; loading: boolean | null }) {
	const [_, setCart] = useAtom(addCartItem);

	return !loading && product ? (
		<div className={styles.product_card}>
			<Link href={`/products/${product.id}`}>
				<div className={`${styles.image_container}`}>
					<Image
						src={product.image}
						alt={product.title}
						fill
						sizes='(max-width: 768px) 100vw,
								 (max-width: 1200px) 50vw,
							   33vw'
						style={{ objectFit: 'contain' }}
					/>
				</div>
			</Link>
			<ProductInfo product={product} config={{ description: { disable: true }, quantity: { disable: true }, title: { class: 'title', productCard: true } }} />
		</div>
	) : (
		<div className={styles.product_card}>
			<div className={`${styles.loading}`} />
			<div className={styles.info_container}>
				<div className={`${styles.loading} ${styles.placeholder}`} style={{ width: '100%' }} />
				<div className={styles.bottom_container}>
					<div className={`${styles.loading} ${styles.placeholder}`} style={{ width: '60%' }}>
						<div className={styles.rating_container}>
							<div className={styles.rating_bar} />
						</div>
					</div>
					<button disabled className={`primary-cta ${styles.cta} ${styles.loading}`}>
						Add to cart
					</button>
				</div>
			</div>
		</div>
	);
}
