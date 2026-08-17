'use client';

import './style.scss';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PortableText, PortableTextBlock } from '@portabletext/react';
import SanityImage from '@shared/components/SanityImage';
import { SanityImage as SanityImageType } from '@types/sanity';

export interface PostData {
	title: string;
	category?: string;
	publishedAt: string;
	excerpt?: string;
	coverImage: SanityImageType;
	body?: PortableTextBlock[];
}

const fadeUp = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
	}
};

export default function PostDetail({
	title,
	category,
	publishedAt,
	excerpt,
	coverImage,
	body
}: PostData) {
	const formattedDate = publishedAt
		? new Date(publishedAt).toLocaleDateString('fr-FR', {
				day: 'numeric',
				month: 'long',
				year: 'numeric'
			})
		: null;

	return (
		<article className="post-detail">
			<header className="post-detail__header">
				<div className="grid-lines post-detail__grid" />
				<div className="container post-detail__header-inner">
					<motion.div
						initial="hidden"
						animate="visible"
						variants={fadeUp}
					>
						<Link href="/blog" className="post-detail__back">
							← Retour au blog
						</Link>

						<div className="post-detail__hero-grid">
							<div>
								{category && (
									<p className="eyebrow">{category}</p>
								)}
								<h1 className="post-detail__title">
									{title}
								</h1>
								{excerpt && (
									<p className="post-detail__excerpt">
										{excerpt}
									</p>
								)}
							</div>

							{formattedDate && (
								<dl className="post-detail__meta">
									<div>
										<dt>Publié le</dt>
										<dd>{formattedDate}</dd>
									</div>
									{category && (
										<div>
											<dt>Catégorie</dt>
											<dd>{category}</dd>
										</div>
									)}
								</dl>
							)}
						</div>
					</motion.div>
				</div>
			</header>

			<motion.div
				className="band post-detail__cover"
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: '-100px' }}
				transition={{ duration: 0.6, ease: 'easeOut' }}
			>
				<div className="container">
					<SanityImage
						image={coverImage}
						alt={coverImage?.alt || title}
						width={1600}
						height={1000}
						priority
						className="post-detail__cover-image"
						sizes="(max-width: 1024px) 100vw, 1200px"
					/>
				</div>
			</motion.div>

			{body && (
				<motion.section
					className="post-detail__story"
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 0.6, ease: 'easeOut' }}
				>
					<div className="container post-detail__body">
						<PortableText value={body} />
					</div>
				</motion.section>
			)}

			<section className="blog-cta">
				<div className="container blog-cta__inner">
					<div>
						<p className="blog-cta__eyebrow">Votre projet</p>
						<h2 className="blog-cta__title">
							Une idée de site à concrétiser ?
						</h2>
					</div>
					<Link href="/contact" className="button-primary">
						Décrire mon projet <span aria-hidden="true">→</span>
					</Link>
				</div>
			</section>
		</article>
	);
}
