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

export default function RealisationsHero() {
	return (
		<section className="realisations-hero">
			<motion.div
				className="container"
				variants={heroVariants}
				initial="hidden"
				animate="visible"
			>
				<div className="realisations-hero__text-reveal">
					<motion.h1
						className="realisations-hero__title"
						variants={itemVariants}
					>
						Nos réalisations
					</motion.h1>
				</div>
				<div className="realisations-hero__text-reveal">
					<motion.p
						className="realisations-hero__subtitle"
						variants={itemVariants}
					>
						Des projets pensés et développés sur mesure pour des
						clients locaux et au-delà. Next.js, Sanity CMS, Shopify.
					</motion.p>
				</div>
			</motion.div>
		</section>
	);
}
