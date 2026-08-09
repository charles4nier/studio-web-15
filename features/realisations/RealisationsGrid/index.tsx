'use client';

import './style.scss';
import Link from 'next/link';
import ProjectCard from '../ProjectCard';
import { SanityImage } from '@types/sanity';

export interface Project {
	_id: string;
	slug: string;
	title: string;
	client?: string;
	category?: string;
	excerpt?: string;
	coverImage: SanityImage;
	technologies?: string[];
	resultLine?: string;
}

interface RealisationsGridProps {
	projects: Project[];
}

export default function RealisationsGrid({ projects }: RealisationsGridProps) {
	if (projects.length === 0) {
		return (
			<section className="band">
				<div className="container realisations-empty">
					<p className="realisations-empty__title">
						Les premières réalisations arrivent bientôt.
					</p>
					<p className="realisations-empty__text">
						En attendant, discutons de votre projet directement.
					</p>
					<Link href="/contact" className="button-primary">
						Me contacter
					</Link>
				</div>
			</section>
		);
	}

	const [latest, ...rest] = projects;

	return (
		<section className="band" aria-labelledby="projects-title">
			<div className="container">
				<div className="realisations-grid">
					<div className="realisations-grid__featured">
						<ProjectCard {...latest} number={1} featured />
					</div>

					{rest.length > 0 && (
						<div className="realisations-grid__rest">
							{rest.map((project, index) => (
								<ProjectCard
									key={project._id}
									{...project}
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
