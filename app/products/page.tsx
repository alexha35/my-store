import styles from './products.module.css';
import { Product as ProductInterface } from '@/types/product';
import ProductsContainer from '@/components/product/ProductsContainer';

async function getData(): Promise<ProductInterface[]> {
	const res = await fetch('https://fakestoreapi.com/products');
	const data = await res.json();
	return data;
}

export default async function Products() {
	const data = await getData();
	console.log(data);
	return (
		<>
			<h1 className={`subheadline ${styles.title}`}>All Products</h1>
			<ProductsContainer products={data} loading={false} />
		</>
	);
}
