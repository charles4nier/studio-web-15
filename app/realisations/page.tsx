import { Metadata } from 'next';
import { generatePageMetadata } from '@shared/config/seo';
import StructuredData from '@shared/components/StructuredData';
import Realisations from '@features/realisations';

export const metadata: Metadata = generatePageMetadata({
	title: 'Réalisations - Sites internet créés à Aurillac, Cantal',
	description:
		'Découvrez mes réalisations : sites vitrines et e-commerce Next.js, Sanity CMS, Shopify. Projets pour des clients du Cantal, de l’Aveyron et au-delà.',
	path: '/realisations'
});

export default function RealisationsPage() {
	return (
		<>
			<StructuredData
				type="WebPage"
				data={{
					name: 'Réalisations - Studio Web 15',
					description:
						'Portfolio de réalisations web : sites vitrines, e-commerce et applications sur mesure.'
				}}
			/>
			<Realisations />
		</>
	);
}
