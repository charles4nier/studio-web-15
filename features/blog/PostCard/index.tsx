import './style.scss';
import Link from 'next/link';
import SanityImage from '@shared/components/SanityImage';
import { SanityImage as SanityImageType } from '@types/sanity';

interface PostCardProps {
	slug: string;
	title: string;
	category?: string;
	excerpt?: string;
	coverImage: SanityImageType;
	publishedAt: string;
	number: number;
	featured?: boolean;
}

export default function PostCard({
	slug,
	title,
	category,
	excerpt,
	coverImage,
	publishedAt,
	number,
	featured = false
}: PostCardProps) {
	const formattedDate = publishedAt
		? new Date(publishedAt).toLocaleDateString('fr-FR', {
				day: 'numeric',
				month: 'long',
				year: 'numeric'
			})
		: null;

	return (
		<article
			className={`post-card${featured ? ' post-card--featured' : ''}`}
		>
			<Link
				href={`/blog/${slug}`}
				className="post-card__media-link"
				aria-label={`Lire l'article ${title}`}
			>
				<div className="post-card__media">
					<SanityImage
						image={coverImage}
						alt={coverImage?.alt || title}
						width={featured ? 1400 : 900}
						height={featured ? 933 : 600}
						priority={featured}
						className="post-card__image"
						sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 700px"
					/>
					<span className="post-card__arrow" aria-hidden="true">
						↗
					</span>
				</div>
			</Link>

			<div className="post-card__body">
				<div className="post-card__meta">
					<span className="post-card__number">
						{String(number).padStart(2, '0')}
					</span>
					{category && (
						<span className="post-card__category">
							{category}
						</span>
					)}
					{formattedDate && (
						<span className="post-card__date">
							{formattedDate}
						</span>
					)}
				</div>

				<h3 className="post-card__title">{title}</h3>

				{excerpt && (
					<p className="post-card__excerpt">{excerpt}</p>
				)}
			</div>

			<Link href={`/blog/${slug}`} className="post-card__link">
				Lire l&apos;article <span aria-hidden="true">→</span>
			</Link>
		</article>
	);
}
