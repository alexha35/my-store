'use client';
import { useAtom, useSetAtom } from 'jotai';

import styles from './products_container.module.css';
import Product from './Product';
import { Product as ProductInterface } from '@/types/product';
import { productsAtom, originalProductsAtom } from '@/atoms/product.atom';
import Filter from '../filter/Filter';

export default function ProductsContainer({ products, loading }: { products: ProductInterface[]; loading: boolean }) {
	const emptyArr = [...Array(20)];

	const setOriginalProductsAtom = useSetAtom(originalProductsAtom);
	const [currProductsAtom, setCurrProductsAtom] = useAtom(productsAtom);
	setOriginalProductsAtom(products);
	setCurrProductsAtom(products);

	return (
		<div className={styles.content_container}>
			<Filter />
			<div className={styles.products_container}>
				{/* {loading
					? emptyArr.map((_, i) => <Product key={i} product={null} loading={true} />)
					: currProductsAtom.map((product) => {
							return <Product key={product.id} product={product} loading={false} />;
					  })} */}
				{currProductsAtom.map((product) => {
					return <Product key={product.id} product={product} loading={false} />;
				})}
			</div>
		</div>
	);
}
