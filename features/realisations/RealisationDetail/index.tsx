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
	year?: string;
	excerpt?: string;
	coverImage: SanityImageType;
	gallery?: SanityImageType[];
	technologies?: string[];
	url?: string;
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

export default function RealisationDetail({
	title,
	client,
	category,
	year,
	excerpt,
	coverImage,
	gallery,
	technologies,
	url,
	body
}: RealisationData) {
	return (
		<article className="realisation-detail">
			<header className="realisation-detail__header">
				<div className="container">
					<motion.div
						initial="hidden"
						animate="visible"
						variants={fadeUp}
					>
						<Link
							href="/realisations"
							className="realisation-detail__back"
						>
							← Toutes les réalisations
						</Link>
						<div className="realisation-detail__meta">
							{category && (
								<span className="realisation-detail__badge">
									{category}
								</span>
							)}
							{year && (
								<span className="realisation-detail__year">
									{year}
								</span>
							)}
						</div>
						<h1 className="realisation-detail__title">{title}</h1>
						{client && (
							<p className="realisation-detail__client">
								{client}
							</p>
						)}
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
								Voir le site
							</a>
						)}
					</motion.div>
				</div>
			</header>

			<motion.div
				className="realisation-detail__cover"
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

			{(technologies && technologies.length > 0) || body ? (
				<motion.section
					className="realisation-detail__content"
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 0.6, ease: 'easeOut' }}
				>
					<div className="container">
						<div className="realisation-detail__content-grid">
							{body && (
								<div className="realisation-detail__body">
									<PortableText value={body} />
								</div>
							)}
							{technologies && technologies.length > 0 && (
								<aside className="realisation-detail__sidebar">
									<h2>Technologies</h2>
									<ul className="realisation-detail__tags">
										{technologies.map((tech) => (
											<li key={tech}>{tech}</li>
										))}
									</ul>
								</aside>
							)}
						</div>
					</div>
				</motion.section>
			) : null}

			{gallery && gallery.length > 0 && (
				<motion.section
					className="realisation-detail__gallery"
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 0.6, ease: 'easeOut' }}
				>
					<div className="container">
						<div className="realisation-detail__gallery-grid">
							{gallery.map((image, index) => (
								<SanityImage
									key={index}
									image={image}
									alt={
										image?.alt ||
										`${title} — image ${index + 1}`
									}
									width={900}
									height={700}
									className="realisation-detail__gallery-image"
									sizes="(max-width: 768px) 100vw, 50vw"
								/>
							))}
						</div>
					</div>
				</motion.section>
			)}

			<section className="cta-section">
				<div className="container">
					<h2 className="cta-section__title">
						Un projet similaire en tête ?
					</h2>
					<p className="cta-section__subtitle">
						Discutons de vos besoins et trouvons la solution idéale
						ensemble.
					</p>
					<Link href="/contact" className="button-primary">
						Demander un devis gratuit
					</Link>
				</div>
			</section>
		</article>
	);
}
