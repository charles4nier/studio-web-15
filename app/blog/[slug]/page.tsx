import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generatePageMetadata } from '@shared/config/seo';
import StructuredData from '@shared/components/StructuredData';
import { client } from '@shared/utils/sanity';
import PostDetail, { PostData } from '@features/blog/PostDetail';

type Params = { slug: string };

const query = `
*[_type == "post" && slug.current == $slug][0]{
  title,
  category,
  publishedAt,
  excerpt,
  coverImage,
  body,
  seo
}
`;

export const revalidate = 3600; // Cache 1 heure

export async function generateStaticParams() {
	const slugs: string[] = await client.fetch(
		`*[_type == "post" && defined(slug.current)].slug.current`
	);
	return slugs.map((slug) => ({ slug }));
}

async function getPost(slug: string) {
	return client.fetch(query, { slug });
}

export async function generateMetadata({
	params
}: {
	params: Params;
}): Promise<Metadata> {
	const { slug } = params;
	const data = await getPost(slug);

	if (!data) {
		return generatePageMetadata({
			title: 'Article introuvable',
			description: 'Cet article n’existe pas ou plus.',
			path: `/blog/${slug}`,
			noindex: true
		});
	}

	return generatePageMetadata({
		title: data.seo?.metaTitle || data.title,
		description:
			data.seo?.metaDescription ||
			data.excerpt ||
			`Découvrez l'article ${data.title}.`,
		path: `/blog/${slug}`
	});
}

export default async function PostPage({ params }: { params: Params }) {
	const { slug } = params;
	const data: PostData | null = await getPost(slug);

	if (!data) {
		notFound();
	}

	return (
		<>
			<StructuredData
				type="Article"
				data={{
					title: data.title,
					description: data.excerpt,
					publishedAt: data.publishedAt,
					url: `/blog/${slug}`
				}}
			/>
			<PostDetail {...data} />
		</>
	);
}
