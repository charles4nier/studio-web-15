import { Metadata } from 'next';
import { generatePageMetadata } from '@shared/config/seo';
import StructuredData from '@shared/components/StructuredData';
import HomePage from '@features/home';

export const metadata: Metadata = generatePageMetadata({
	title: 'Création de site internet à Aurillac, Cantal',
	description:
		'Développeur web freelance à Aurillac, dans le Cantal (15). Création de sites internet dès 500€, e-commerce Shopify. Intervention Aurillac, Rodez, Creuse.',
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
