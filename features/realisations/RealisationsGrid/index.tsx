'use client';

import './style.scss';
import { motion } from 'framer-motion';
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
}

interface RealisationsGridProps {
	projects: Project[];
}

const gridVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.12
		}
	}
};

const itemVariants = {
	hidden: { y: 30, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
	}
};

export default function RealisationsGrid({ projects }: RealisationsGridProps) {
	if (projects.length === 0) {
		return (
			<section className="realisations-empty">
				<div className="container">
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

	return (
		<motion.section
			className="realisations-grid"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: '-100px' }}
			variants={gridVariants}
		>
			<div className="container">
				<div className="realisations-grid__list">
					{projects.map((project) => (
						<motion.div key={project._id} variants={itemVariants}>
							<ProjectCard {...project} />
						</motion.div>
					))}
				</div>
			</div>
		</motion.section>
	);
}
