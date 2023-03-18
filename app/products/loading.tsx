import ProductsContainer from '@/components/product/ProductsContainer';
import styles from './products.module.css';

export default function Loading() {
	return (
		<>
			<h1 className={`subheadline ${styles.title}`}>All Products</h1>
			{/* <ProductsContainer products={[]} loading={true} /> */}
		</>
	);
}
