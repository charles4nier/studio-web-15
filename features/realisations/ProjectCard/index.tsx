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
}

export default function ProjectCard({
	slug,
	title,
	client,
	category,
	excerpt,
	coverImage,
	technologies
}: ProjectCardProps) {
	return (
		<Link href={`/realisations/${slug}`} className="project-card">
			<div className="project-card__media">
				<SanityImage
					image={coverImage}
					alt={coverImage?.alt || title}
					width={800}
					height={600}
					className="project-card__image"
					sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
				/>
				{category && (
					<span className="project-card__category">{category}</span>
				)}
			</div>
			<div className="project-card__body">
				<h3 className="project-card__title">{title}</h3>
				{client && <p className="project-card__client">{client}</p>}
				{excerpt && <p className="project-card__excerpt">{excerpt}</p>}
				{technologies && technologies.length > 0 && (
					<ul className="project-card__tags">
						{technologies.map((tech) => (
							<li key={tech}>{tech}</li>
						))}
					</ul>
				)}
			</div>
			<span className="project-card__arrow" aria-hidden="true">
				→
			</span>
		</Link>
	);
}
