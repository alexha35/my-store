'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useAtomValue } from 'jotai';

import styles from './navigation.module.css';
import { cartAtom } from '@/atoms/cart.atom';

export default function Navigation() {
	const [open, setOpen] = useState<boolean>(false);
	const cart = useAtomValue(cartAtom);

	return (
		<header>
			<nav className={styles.navigation}>
				<h1 className={styles.logo}>
					<Link href={'/'}>STORE.</Link>
				</h1>

				<div className={styles.right_container}>
					<Link href={'/cart'}>
						<span className={styles.cart_container} data-cart-length={cart.itemCount}>
							<AiOutlineShoppingCart style={{ height: '100%', width: '100%' }} />
						</span>
					</Link>
					<ul className={`${styles.list} ${open ? styles.active : ''}`}>
						<li className={`nav-typography ${styles.item}`} onClick={() => setOpen(false)}>
							<Link href={'/#'}>Deals</Link>
						</li>
						<li className={`nav-typography ${styles.item}`} onClick={() => setOpen(false)}>
							<Link href={'/products'}>Products</Link>
						</li>
						{open && (
							<li className={`nav-typography ${styles.item}`} onClick={() => setOpen(false)}>
								<Link href={'/cart'}>Cart</Link>
							</li>
						)}
					</ul>
					<span role='button' className={styles.burger_container} style={open ? { position: 'fixed', top: '1rem', right: '1rem' } : {}} onClick={() => setOpen(!open)}>
						<span className={`${styles.line} ${open ? styles.line_active : ''}`} />
						<span className={`${styles.line} ${open ? styles.line_active : ''}`} />
						<span className={`${styles.line} ${open ? styles.line_active : ''}`} />
					</span>
				</div>
			</nav>
		</header>
	);
}
