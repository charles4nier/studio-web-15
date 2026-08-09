import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generatePageMetadata } from '@shared/config/seo';
import StructuredData from '@shared/components/StructuredData';
import { client } from '@shared/utils/sanity';
import RealisationDetail, {
	RealisationData
} from '@features/realisations/RealisationDetail';

type Params = { slug: string };

const query = `
*[_type == "realisation" && slug.current == $slug][0]{
  title,
  client,
  category,
  role,
  year,
  excerpt,
  coverImage,
  gallery,
  technologies,
  resultLine,
  url,
  body,
  seo
}
`;

export const revalidate = 3600; // Cache 1 heure

export async function generateStaticParams() {
	const slugs: string[] = await client.fetch(
		`*[_type == "realisation" && defined(slug.current)].slug.current`
	);
	return slugs.map((slug) => ({ slug }));
}

async function getRealisation(slug: string) {
	return client.fetch(query, { slug });
}

export async function generateMetadata({
	params
}: {
	params: Params;
}): Promise<Metadata> {
	const { slug } = params;
	const data = await getRealisation(slug);

	if (!data) {
		return generatePageMetadata({
			title: 'Réalisation introuvable',
			description: 'Cette réalisation n’existe pas ou plus.',
			path: `/realisations/${slug}`,
			noindex: true
		});
	}

	return generatePageMetadata({
		title: data.seo?.metaTitle || `${data.title} - Réalisation`,
		description:
			data.seo?.metaDescription ||
			data.excerpt ||
			`Découvrez le projet ${data.title}.`,
		path: `/realisations/${slug}`
	});
}

export default async function RealisationPage({ params }: { params: Params }) {
	const { slug } = params;
	const data: RealisationData | null = await getRealisation(slug);

	if (!data) {
		notFound();
	}

	return (
		<>
			<StructuredData
				type="WebPage"
				data={{
					name: data.title,
					description: data.excerpt
				}}
			/>
			<RealisationDetail {...data} />
		</>
	);
}
