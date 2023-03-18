import '../styles/globals.css';
import { Roboto } from '@next/font/google';

import Providers from '@/components/provider/Provider';
import Navigation from '@/components/navigation/Navigation';

const roboto = Roboto({
	fallback: ['system-ui', 'arial'],
	weight: ['400', '500', '700', '900'],
	subsets: ['latin'],
	variable: '--font-roboto',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			{/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
			<head />
			<body className={roboto.className}>
				<Providers>
					<Navigation />
					{children}
				</Providers>
			</body>
		</html>
	);
}
