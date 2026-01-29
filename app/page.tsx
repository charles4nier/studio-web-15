import { Metadata } from 'next';
import { generatePageMetadata } from '@shared/config/seo';
import StructuredData from '@shared/components/StructuredData';
import HomePage from '@features/home';

export const metadata: Metadata = generatePageMetadata({
	title: 'Accueil',
	description:
		'Studio Web 15 - Agence de développement web spécialisée en Next.js, React et solutions digitales sur mesure.',
	path: '/'
});

export default function Page() {
	return (
		<>
			<StructuredData type="Organization" />
			<StructuredData type="WebSite" />
			<HomePage />
		</>
	);
}
