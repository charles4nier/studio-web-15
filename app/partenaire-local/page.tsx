import { Metadata } from 'next';
import { generatePageMetadata } from '@shared/config/seo';
import StructuredData from '@shared/components/StructuredData';
import PartenaireLocal from '@features/partenaire-local';

export const metadata: Metadata = generatePageMetadata({
	title: 'Votre partenaire local - Cantal, Aveyron, Creuse',
	description:
		"Agence web locale basée dans le Cantal. Nous accompagnons les entreprises d'Aurillac, Rodez, Guéret, Tulle, Clermont-Ferrand. Proximité, déplacements possibles, technologie moderne.",
	path: '/partenaire-local'
});

export default function PartenaireLocalPage() {
	return (
		<>
			<StructuredData
				type="WebPage"
				data={{
					name: 'Votre partenaire local - Studio Web 15',
					description:
						"Départements d'accompagnement : Cantal, Aveyron, Creuse, Corrèze, Puy-de-Dôme, Haute-Loire."
				}}
			/>
			<PartenaireLocal />
		</>
	);
}
