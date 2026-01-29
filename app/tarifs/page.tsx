import { Metadata } from 'next';
import { generatePageMetadata } from '@shared/config/seo';
import StructuredData from '@shared/components/StructuredData';
import Tarifs from '@features/tarifs';

export const metadata: Metadata = generatePageMetadata({
	title: 'Tarifs - Création Site Web Cantal & Aveyron',
	description:
		'Tarifs transparents : Site vitrine dès 1500€, e-commerce Shopify dès 2000€. Intervention Cantal, Aveyron, Creuse. Hébergement gratuit, technologie Next.js moderne.',
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
						'Tarifs création sites web Next.js et e-commerce Shopify. Technologie moderne, performance optimale.'
				}}
			/>
			<Tarifs />
		</>
	);
}
