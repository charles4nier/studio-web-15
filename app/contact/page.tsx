import { Metadata } from 'next';
import { generatePageMetadata } from '@shared/config/seo';
import StructuredData from '@shared/components/StructuredData';
import Contact from '@features/contact';

export const metadata: Metadata = generatePageMetadata({
	title: 'Contact - Studio Web Cantal, Aveyron, Creuse',
	description:
		'Contactez votre studio web pour un devis gratuit sous 24h. Basé dans le Cantal, intervention Aurillac, Rodez, Guéret. Sites Next.js et Shopify.',
	path: '/contact'
});

export default function ContactPage() {
	return (
		<>
			<StructuredData
				type="WebPage"
				data={{
					name: 'Contact - Studio Web 15',
					description:
						'Contactez Studio Web 15 pour votre projet web. Sites Next.js et boutiques Shopify.'
				}}
			/>
			<Contact />
		</>
	);
}
