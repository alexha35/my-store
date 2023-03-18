import { useState } from 'react';
import { useAtom } from 'jotai';
import { AiOutlineStar, AiOutlineDown } from 'react-icons/ai';

import styles from './filter.module.css';
import { filterTrackerAtom, filterAtom } from '@/atoms/filter.atom';
import { productsAtom } from '@/atoms/product.atom';

export default function Filter() {
	const [open, setOpen] = useState<boolean>(true);
	const [currFilter] = useAtom(filterTrackerAtom);
	const [_, setFilters] = useAtom(filterAtom);

	const handleRating = (idx: number) => {
		currFilter.rating[idx] = !currFilter.rating[idx];
		setFilters({ ...currFilter, rating: [...currFilter.rating] });
	};

	const handlePrice = (type: string, amount: string) => {
		switch (type) {
			case 'min':
				setFilters({
					// type: 'FILTER',
					...currFilter,
					price: {
						...currFilter.price,
						min: Number(amount),
					},
				});
				break;
			case 'max':
				setFilters({
					// type: 'FILTER',
					...currFilter,
					price: {
						...currFilter.price,
						max: Number(amount),
					},
				});
				break;
			default:
				return;
		}
	};

	return (
		<div className={`${styles.filter_container}`}>
			<div className={styles.filter_heading_container} style={{ marginBottom: open ? '1rem' : '0rem' }}>
				<h2 className={`${styles.filter_heading}`}>Filter</h2>
				<span className={styles.chevron} style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} onClick={() => setOpen(!open)}>
					<AiOutlineDown />
				</span>
			</div>
			<div className={`${styles.filter_selection_container}`} style={{ display: open ? 'block' : 'none' }}>
				<div className={styles.filter}>
					<h3 className={styles.filter_title}>Price</h3>
					<div className={styles.text_container}>
						<input type={'text'} className={styles.input_text} placeholder='Min' onChange={(e) => handlePrice('min', e.target.value)} />
						<span>-</span>
						<input type={'text'} className={styles.input_text} placeholder='Max' onChange={(e) => handlePrice('max', e.target.value)} />
					</div>
				</div>
				<div className={styles.filter}>
					<h3 className={styles.filter_title}>Rating</h3>
					<div className={styles.filter_selection}>
						<div className={styles.checkbox_container}>
							<input type={'checkbox'} onClick={() => handleRating(4)} />
							<div className={styles.stars}>
								<AiOutlineStar />
								<AiOutlineStar />
								<AiOutlineStar />
								<AiOutlineStar />
								<AiOutlineStar />
							</div>
						</div>
						<div className={styles.checkbox_container}>
							<input type={'checkbox'} onClick={() => handleRating(3)} />
							<div className={styles.stars}>
								<AiOutlineStar />
								<AiOutlineStar />
								<AiOutlineStar />
								<AiOutlineStar />
							</div>
						</div>
						<div className={styles.checkbox_container}>
							<input type={'checkbox'} onClick={() => handleRating(2)} />
							<div className={styles.stars}>
								<AiOutlineStar />
								<AiOutlineStar />
								<AiOutlineStar />
							</div>
						</div>
						<div className={styles.checkbox_container}>
							<input type={'checkbox'} onClick={() => handleRating(1)} />
							<div className={styles.stars}>
								<AiOutlineStar />
								<AiOutlineStar />
							</div>
						</div>
						<div className={styles.checkbox_container}>
							<input type={'checkbox'} onClick={() => handleRating(0)} />
							<div className={styles.stars}>
								<AiOutlineStar />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
