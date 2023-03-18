export enum Filters {
	'PRICE' = 'price',
	// 'CATEGORY' = 'category',
	'RATING' = 'rating',
	// 'RATING_COUNT' = 'rating_count',
}

export interface Filter {
	price: {
		min: number;
		max: number;
	};
	rating: boolean[];
}
