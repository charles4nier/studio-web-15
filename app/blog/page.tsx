import { Metadata } from 'next';
import { generatePageMetadata } from '@shared/config/seo';
import StructuredData from '@shared/components/StructuredData';
import Blog from '@features/blog';

export const metadata: Metadata = generatePageMetadata({
	title: 'Blog - Conseils création de site internet à Aurillac, Cantal',
	description:
		'Guides pratiques, études de cas et conseils techniques sur la création de sites internet, Next.js et Shopify. Par Studio Web 15, à Aurillac.',
	path: '/blog'
});

export default function BlogPage() {
	return (
		<>
			<StructuredData
				type="WebPage"
				data={{
					name: 'Blog - Studio Web 15',
					description:
						'Guides pratiques, études de cas et conseils techniques sur la création de sites internet.'
				}}
			/>
			<Blog />
		</>
	);
}
