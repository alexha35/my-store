'use client';
import { useRef, useEffect } from 'react';

import styles from './carousel.module.css';

export function Carousel({ children }: { children: React.ReactNode }) {
	const containerRef = useRef<HTMLDivElement | null>(null);

	// useEffect(() => {
	// 	if (!containerRef.current) return;

	// 	containerRef.current.addEventListener('mousedown', (e) => mouseclickDown(e));

	// 	return containerRef.current.removeEventListener('mousedown', (e) => mouseclickDown(e));
	// }, []);

	return (
		<div className={styles.container}>
			<div className={styles.inner} ref={containerRef}>
				{children}
			</div>
		</div>
	);
}

export function CarouselCard({ children }: { children: React.ReactNode }) {
	return <div className={styles.card_container}>{children}</div>;
}
