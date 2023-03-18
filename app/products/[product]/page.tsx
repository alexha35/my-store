import Image from 'next/image';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

import { Product as ProductInterface } from '@/types/product';
import styles from './product.module.css';
import ProductInfo from '@/components/product-info/ProductInfo';
import { Carousel, CarouselCard } from '@/components/carousel/Carousel';
import Link from 'next/link';

async function getData(id: string): Promise<ProductInterface> {
	const res = await fetch(`https://fakestoreapi.com/products/${id}`);
	const data = await res.json();
	return data;
}

async function getProductsByCategory(category: string, id: string): Promise<ProductInterface[]> {
	const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
	const data = await res.json();
	const filtedData = data.filter((item: ProductInterface) => item.id !== Number(id));
	return filtedData;
}

export default async function ProductID({ params }: { params: Params }) {
	const data = await getData(params.product);
	const productsByCategory = await getProductsByCategory(data.category, params.product);

	return (
		<div className={styles.container}>
			<div className={styles.image_container}>
				<Image src={data.image} alt={data.title} fill style={{ objectFit: 'contain', margin: '0 auto' }} />
			</div>
			<div className={styles.info_container}>
				<ProductInfo product={data} config={{ title: { class: 'headline' } }} />

				<Carousel>
					{productsByCategory.map((item) => (
						// <div className={styles.item_card} key={item.id} href={`/products/${item.id}`}>
						<div className={styles.item_card} key={item.id}>
							<Image height={100} width={100} src={item.image} alt={item.description} />
							<div className={styles.bottom_card}>
								<h4>{item.title}</h4>
								<p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(item.price))}</p>
							</div>
						</div>
					))}
				</Carousel>
			</div>
		</div>
	);
}
