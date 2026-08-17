'use client';

import './style.scss';
import Link from 'next/link';
import PostCard from '../PostCard';
import { SanityImage } from '@types/sanity';

export interface Post {
	_id: string;
	slug: string;
	title: string;
	category?: string;
	excerpt?: string;
	coverImage: SanityImage;
	publishedAt: string;
}

interface BlogGridProps {
	posts: Post[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
	if (posts.length === 0) {
		return (
			<section className="band">
				<div className="container blog-empty">
					<p className="blog-empty__title">
						Les premiers articles arrivent bientôt.
					</p>
					<p className="blog-empty__text">
						En attendant, discutons de votre projet directement.
					</p>
					<Link href="/contact" className="button-primary">
						Me contacter
					</Link>
				</div>
			</section>
		);
	}

	const [latest, ...rest] = posts;

	return (
		<section className="band" aria-labelledby="posts-title">
			<div className="container">
				<div className="blog-grid">
					<div className="blog-grid__featured">
						<PostCard {...latest} number={1} featured />
					</div>

					{rest.length > 0 && (
						<div className="blog-grid__rest">
							{rest.map((post, index) => (
								<PostCard
									key={post._id}
									{...post}
									number={index + 2}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
