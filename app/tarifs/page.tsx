import { Metadata } from 'next';
import { generatePageMetadata } from '@shared/config/seo';
import StructuredData from '@shared/components/StructuredData';
import Tarifs from '@features/tarifs';

export const metadata: Metadata = generatePageMetadata({
	title: 'Tarifs - Création Site Web Cantal & Aveyron',
	description:
		'Tarifs transparents : création de site internet dès 500€, e-commerce Shopify. Intervention Cantal, Aveyron, Creuse. Hébergement gratuit, technologie moderne.',
	path: '/tarifs'
});

export default function TarifsPage() {
	return (
		<>
			<StructuredData
				type="WebPage"
				data={{
					name: 'Tarifs - Studio Web 15',
					description:
						'Tarifs création de sites internet et boutiques en ligne. Technologie moderne, performance optimale.'
				}}
			/>
			<Tarifs />
		</>
	);
}
