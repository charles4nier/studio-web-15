'use client';

import StructuredData from '@shared/components/StructuredData';
import Contact from '@features/contact';

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
