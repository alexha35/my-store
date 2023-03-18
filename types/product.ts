export enum Categories {
	'ELECTRONICS' = 'electronics',
	'JEWLERY' = 'jewelery',
	'MENS_CLOTHING' = "men's clothing",
	'WOMENS_CLOTHING' = "women's clothing",
}

export interface Product {
	id: number;
	title: string;
	price: string;
	category: Categories;
	description: string;
	image: string;
	rating: {
		rate: number;
		count: number;
	};
}
