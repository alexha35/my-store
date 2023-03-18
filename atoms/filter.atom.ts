import { Filter } from '@/types/filter';
import { atom } from 'jotai';
import { originalProductsAtom, productsAtom } from './product.atom';

export const initialFilter = {
	price: {
		min: 0,
		max: Infinity,
	},
	rating: [false, false, false, false, false],
};

export const filterTrackerAtom = atom(initialFilter);

export const filterAtom = atom(null, (get, set, update: Filter) => {
	if (update === initialFilter) {
		return set(productsAtom, get(originalProductsAtom));
	}
	const minPrice = update.price.min > update.price.max || update.price.min > get(filterTrackerAtom).price.max ? 0 : update.price.min;
	const maxPrice = update.price.min > update.price.max || update.price.min > get(filterTrackerAtom).price.max ? Infinity : update.price.max;
	const filterByPrice = get(originalProductsAtom).filter((product) => Number(product.price) >= minPrice && Number(product.price) <= maxPrice);
	const filterByRating = update.rating.includes(true) && filterByPrice ? filterByPrice.filter((product) => update.rating[Math.round(Number(product.rating.rate)) - 1]) : filterByPrice;
	// const updateFilterAtom = { ...get(filterTrackerAtom), price: { ...get(filterTrackerAtom).price, min: update.price.min, max: update.price.max }, rating: [...update.rating] };
	const updateFilterAtom = { ...update };
	set(filterAtom, updateFilterAtom);
	set(productsAtom, filterByRating);

	console.log(update);
});
