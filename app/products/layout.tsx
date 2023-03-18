import styles from './products.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
	return <div className={styles.container}>{children}</div>;
}
