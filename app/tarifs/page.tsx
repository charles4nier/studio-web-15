import { Metadata } from 'next';
import { generatePageMetadata } from '@shared/config/seo';
import StructuredData from '@shared/components/StructuredData';
import Tarifs from '@features/tarifs';

export const metadata: Metadata = generatePageMetadata({
	title: 'Tarifs création de site internet à Aurillac, Cantal',
	description:
		'Création de site internet à Aurillac avec tarifs transparents : site one-page dès 500€, site vitrine dès 1 500€, boutique en ligne Shopify dès 2 000€.',
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
						'Site one-page dès 500€, site vitrine dès 1 500€, boutique en ligne Shopify dès 2 000€. Développeur web freelance à Aurillac, Cantal.'
				}}
			/>
			<Tarifs />
		</>
	);
}
