import { Ubuntu, Inter } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import { defaultMetadata } from '@shared/config/seo';

export const ubuntu = Ubuntu({
	subsets: ['latin'],
	weight: ['400', '500', '700'],
	variable: '--font-ubuntu',
	display: 'swap',
	preload: true
});

export const inter = Inter({
	subsets: ['latin'],
	weight: ['400', '500', '700'],
	variable: '--font-inter',
	display: 'swap',
	preload: true
});

export const metadata: Metadata = {
	...defaultMetadata,
	icons: {
		icon: [
			{ url: '/favicon.ico' },
			{ url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' }
		],
		apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }]
	},
	manifest: '/manifest.json'
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	viewportFit: 'cover',
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#ffffff' },
		{ media: '(prefers-color-scheme: dark)', color: '#1a1a1a' }
	]
};

import '@shared/styles/index.scss';

import Header from '@shared/components/Header';
import PageTransition from '@shared/components/PageTransition';
import Footer from '@shared/components/Footer';
import PageWrapper from '@shared/components/PageWrapper';
import HeroTransition from '@shared/components/HeroTransition';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="fr" className={`${ubuntu.variable} ${inter.variable}`}>
			<body>
				<PageWrapper>
					<HeroTransition />
					<Header />
					<PageTransition>
						<main>{children}</main>
					</PageTransition>
					<Footer />
				</PageWrapper>
			</body>
		</html>
	);
}
