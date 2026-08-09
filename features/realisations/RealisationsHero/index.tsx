'use client';

import './style.scss';
import { motion } from 'framer-motion';

const heroVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.2
		}
	}
};

const itemVariants = {
	hidden: { y: 30, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
	}
};

interface RealisationsHeroProps {
	count: number;
}

export default function RealisationsHero({ count }: RealisationsHeroProps) {
	return (
		<section className="realisations-hero">
			<div className="grid-lines realisations-hero__grid" />
			<motion.div
				className="container realisations-hero__inner"
				variants={heroVariants}
				initial="hidden"
				animate="visible"
			>
				<div>
					<motion.p className="eyebrow" variants={itemVariants}>
						Exemples de projets
					</motion.p>
					<motion.h1
						className="realisations-hero__title"
						variants={itemVariants}
					>
						Voici ce que je peux créer
						<span className="acid-text realisations-hero__title-accent">
							pour votre activité.
						</span>
					</motion.h1>
				</div>
				<motion.div
					className="realisations-hero__side"
					variants={itemVariants}
				>
					<p>
						Sites vitrines, boutiques en ligne et outils métiers :
						chaque projet est conçu pour présenter clairement votre
						travail et vous aider à développer votre activité.
					</p>
					<p className="realisations-hero__count">
						{String(count).padStart(2, '0')} exemple
						{count > 1 ? 's' : ''} à découvrir
					</p>
				</motion.div>
			</motion.div>
		</section>
	);
}
