import './style.scss';
import Link from 'next/link';
import SanityImage from '@shared/components/SanityImage';
import { SanityImage as SanityImageType } from '@types/sanity';

interface ProjectCardProps {
	slug: string;
	title: string;
	client?: string;
	category?: string;
	excerpt?: string;
	coverImage: SanityImageType;
	technologies?: string[];
	resultLine?: string;
	number: number;
	featured?: boolean;
}

export default function ProjectCard({
	slug,
	title,
	category,
	excerpt,
	coverImage,
	technologies,
	resultLine,
	number,
	featured = false
}: ProjectCardProps) {
	return (
		<article
			className={`project-card${featured ? ' project-card--featured' : ''}`}
		>
			<Link
				href={`/realisations/${slug}`}
				className="project-card__media-link"
				aria-label={`Voir le projet ${title}`}
			>
				<div className="project-card__media">
					<SanityImage
						image={coverImage}
						alt={coverImage?.alt || title}
						width={featured ? 1400 : 900}
						height={featured ? 933 : 600}
						priority={featured}
						className="project-card__image"
						sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 700px"
					/>
					<span className="project-card__arrow" aria-hidden="true">
						↗
					</span>
				</div>
			</Link>

			<div className="project-card__body">
				<div className="project-card__meta">
					<span className="project-card__number">
						{String(number).padStart(2, '0')}
					</span>
					{category && (
						<span className="project-card__category">
							{category}
						</span>
					)}
				</div>

				<h3 className="project-card__title">{title}</h3>

				{excerpt && (
					<p className="project-card__excerpt">{excerpt}</p>
				)}

				{technologies && technologies.length > 0 && (
					<ul className="project-card__services">
						{technologies.map((tech) => (
							<li key={tech}>{tech}</li>
						))}
					</ul>
				)}
			</div>

			{resultLine && (
				<p className="project-card__result">
					<span aria-hidden="true">↳</span>
					{resultLine}
				</p>
			)}

			<Link
				href={`/realisations/${slug}`}
				className="project-card__link"
			>
				Voir le projet <span aria-hidden="true">→</span>
			</Link>
		</article>
	);
}
