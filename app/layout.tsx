import { Space_Grotesk, DM_Sans } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import { defaultMetadata } from '@shared/config/seo';

// Variables CSS conservées (--font-ubuntu/--font-inter) : de nombreux
// composants les référencent déjà en dur, seule la police chargée change.
export const ubuntu = Space_Grotesk({
	subsets: ['latin'],
	weight: ['500', '700'],
	variable: '--font-ubuntu',
	display: 'swap',
	preload: true
});

export const inter = DM_Sans({
	subsets: ['latin'],
	weight: ['400', '500'],
	variable: '--font-inter',
	display: 'swap',
	preload: true
});

export const metadata: Metadata = {
	...defaultMetadata,
	manifest: '/manifest.json'
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	viewportFit: 'cover',
	colorScheme: 'light',
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#ffffff' },
		{ media: '(prefers-color-scheme: dark)', color: '#ffffff' }
	]
};

import '@shared/styles/index.scss';

import Header from '@shared/components/Header';
import PageTransition from '@shared/components/PageTransition';
import Footer from '@shared/components/Footer';
import PageWrapper from '@shared/components/PageWrapper';
import HeroTransition from '@shared/components/HeroTransition';
import FloatingContact from '@shared/components/FloatingContact';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="fr" className={`${ubuntu.variable} ${inter.variable}`}>
			<body>
				<div id="main-content">
					<PageWrapper>
						<HeroTransition />
						<Header />
						<PageTransition>
							<main>{children}</main>
						</PageTransition>
						<Footer />
						<FloatingContact />
					</PageWrapper>
				</div>
			</body>
		</html>
	);
}
