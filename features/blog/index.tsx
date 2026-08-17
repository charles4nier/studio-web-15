import './style.scss';
import Link from 'next/link';
import { client } from '@shared/utils/sanity';
import BlogHero from './BlogHero';
import BlogGrid, { Post } from './BlogGrid';

const query = `
*[_type == "post"] | order(featured desc, publishedAt desc) {
  "_id": _id,
  "slug": slug.current,
  title,
  category,
  excerpt,
  coverImage,
  publishedAt
}
`;

export const revalidate = 3600; // Cache 1 heure

export default async function Blog() {
	const posts: Post[] = (await client.fetch(query)) || [];

	return (
		<div className="blog">
			<BlogHero count={posts.length} />
			<BlogGrid posts={posts} />

			<section className="blog-cta">
				<div className="container blog-cta__inner">
					<div>
						<p className="blog-cta__eyebrow">Votre projet</p>
						<h2 className="blog-cta__title">
							Vous avez besoin d&apos;un site ? Écrivez-moi.
						</h2>
					</div>
					<Link href="/contact" className="button-primary">
						Décrire mon projet <span aria-hidden="true">→</span>
					</Link>
				</div>
			</section>
		</div>
	);
}
