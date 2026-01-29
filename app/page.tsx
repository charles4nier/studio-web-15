import { Metadata } from 'next';
import { generatePageMetadata } from '@shared/config/seo';
import StructuredData from '@shared/components/StructuredData';
import HomePage from '@features/home';

export const metadata: Metadata = generatePageMetadata({
	title: 'Agence Web Cantal - Création Site Internet Aurillac',
	description:
		'Agence web dans le Cantal (15). Sites vitrines Next.js dès 1500€, e-commerce Shopify dès 2000€. Intervention Aurillac, Rodez, Creuse. Proximité et technologie moderne.',
	path: '/'
});

export default function Page() {
	return (
		<>
			<StructuredData type="Organization" />
			<StructuredData type="WebSite" />
			<StructuredData type="LocalBusiness" />
			<HomePage />
		</>
	);
}
