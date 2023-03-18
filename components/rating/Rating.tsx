import { AiOutlineStar } from 'react-icons/ai';

import styles from './rating.module.css';

export default function Rating({ rating }: { rating: { rate: number; count: number } }) {
	return (
		<div className={styles.rating}>
			<div className={styles.rating_container}>
				<div className={styles.rating_bar} style={{ width: `${(Math.round(Number(rating.rate)) / 5) * 100}%` }} />
				<AiOutlineStar size={24} />
				<AiOutlineStar size={24} />
				<AiOutlineStar size={24} />
				<AiOutlineStar size={24} />
				<AiOutlineStar size={24} />
			</div>
			<p className={`body`}>{rating.count}</p>
		</div>
	);
}
