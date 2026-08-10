'use client';

import './style.scss';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PortableText, PortableTextBlock } from '@portabletext/react';
import SanityImage from '@shared/components/SanityImage';
import { SanityImage as SanityImageType } from '@types/sanity';

export interface RealisationData {
	title: string;
	client?: string;
	category?: string;
	role?: string;
	year?: string;
	excerpt?: string;
	coverImage: SanityImageType;
	gallery?: SanityImageType[];
	technologies?: string[];
	url?: string;
	body?: PortableTextBlock[];
	storyTitle?: string;
	stackTitle?: string;
	highlights?: { title: string; description: string }[];
}

const fadeUp = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
	}
};

export default function RealisationDetail({
	title,
	client,
	category,
	role,
	year,
	excerpt,
	coverImage,
	url,
	body,
	storyTitle,
	stackTitle,
	highlights
}: RealisationData) {
	return (
		<article className="realisation-detail">
			<header className="realisation-detail__header">
				<div className="grid-lines realisation-detail__grid" />
				<div className="container realisation-detail__header-inner">
					<motion.div
						initial="hidden"
						animate="visible"
						variants={fadeUp}
					>
						<Link
							href="/realisations"
							className="realisation-detail__back"
						>
							← Retour aux réalisations
						</Link>

						<div className="realisation-detail__hero-grid">
							<div>
								{category && (
									<p className="eyebrow">
										{category}
									</p>
								)}
								<h1 className="realisation-detail__title">
									{title}
								</h1>
								{excerpt && (
									<p className="realisation-detail__excerpt">
										{excerpt}
									</p>
								)}
								{url && (
									<a
										href={url}
										target="_blank"
										rel="noopener noreferrer"
										className="button-primary realisation-detail__cta"
									>
										Voir le site en ligne
									</a>
								)}
							</div>

							{(client || role || category || year) && (
								<dl className="realisation-detail__meta">
									{category && (
										<div>
											<dt>Secteur</dt>
											<dd>{category}</dd>
										</div>
									)}
									{client && (
										<div>
											<dt>Client</dt>
											<dd>{client}</dd>
										</div>
									)}
									{role && (
										<div>
											<dt>Rôle</dt>
											<dd>{role}</dd>
										</div>
									)}
									{year && (
										<div>
											<dt>Année</dt>
											<dd>{year}</dd>
										</div>
									)}
								</dl>
							)}
						</div>
					</motion.div>
				</div>
			</header>

			<motion.div
				className="band realisation-detail__cover"
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
						className="realisation-detail__cover-image"
						sizes="(max-width: 1024px) 100vw, 1200px"
					/>
				</div>
			</motion.div>

			{body && (
				<motion.section
					className="realisation-detail__story"
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 0.6, ease: 'easeOut' }}
				>
					<div className="container realisation-detail__story-inner">
						<div>
							<p className="eyebrow">Le projet</p>
							<h2>{storyTitle || title}</h2>
						</div>
						<div className="realisation-detail__body">
							<PortableText value={body} />
						</div>
					</div>
				</motion.section>
			)}

			{stackTitle && (
				<section className="band realisation-detail__stack">
					<div className="container">
						<p className="eyebrow">Ce qui a été créé</p>
						<h2 className="realisation-detail__stack-title">
							{stackTitle}
						</h2>
						{highlights && highlights.length > 0 && (
							<ul className="realisation-detail__highlights">
								{highlights.map((highlight, index) => (
									<li key={highlight.title}>
										<span>
											{String(index + 1).padStart(2, '0')}
										</span>
										<h3>{highlight.title}</h3>
										<p>{highlight.description}</p>
									</li>
								))}
							</ul>
						)}
					</div>
				</section>
			)}

			<section className="realisations-cta">
				<div className="container realisations-cta__inner">
					<div>
						<p className="realisations-cta__eyebrow">
							Votre projet
						</p>
						<h2 className="realisations-cta__title">
							Vous avez une idée à rendre claire ?
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
