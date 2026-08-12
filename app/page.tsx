import { Metadata } from 'next';
import { generatePageMetadata } from '@shared/config/seo';
import StructuredData from '@shared/components/StructuredData';
import HomePage from '@features/home';

export const metadata: Metadata = generatePageMetadata({
	title: 'Création de site internet à Aurillac, Cantal',
	description:
		'Création de sites internet à Aurillac, sur mesure, performants et esthétiques. Développeur web freelance dans le Cantal (15), dès 500€. Intervention Aurillac, Rodez, Creuse.',
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
