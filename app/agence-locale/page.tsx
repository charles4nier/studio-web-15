import { Metadata } from 'next';
import { generatePageMetadata } from '@shared/config/seo';
import StructuredData from '@shared/components/StructuredData';
import AgenceLocale from '@features/agence-locale';

export const metadata: Metadata = generatePageMetadata({
	title: 'Votre agence locale - Cantal, Aveyron, Creuse',
	description:
		"Agence web locale basée dans le Cantal. Nous accompagnons les entreprises d'Aurillac, Rodez, Guéret, Tulle, Clermont-Ferrand. Proximité, déplacements possibles, technologie moderne.",
	path: '/agence-locale'
});

export default function AgenceLocalePage() {
	return (
		<>
			<StructuredData
				type="WebPage"
				data={{
					name: 'Votre agence locale - Studio Web 15',
					description:
						"Départements d'accompagnement : Cantal, Aveyron, Creuse, Corrèze, Puy-de-Dôme, Haute-Loire."
				}}
			/>
			<AgenceLocale />
		</>
	);
}
