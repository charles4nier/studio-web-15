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

interface BlogHeroProps {
	count: number;
}

export default function BlogHero({ count }: BlogHeroProps) {
	return (
		<section className="blog-hero">
			<div className="grid-lines blog-hero__grid" />
			<motion.div
				className="container blog-hero__inner"
				variants={heroVariants}
				initial="hidden"
				animate="visible"
			>
				<div>
					<motion.p className="eyebrow" variants={itemVariants}>
						Blog
					</motion.p>
					<motion.h1
						className="blog-hero__title"
						variants={itemVariants}
					>
						Conseils et coulisses
						<span className="acid-text blog-hero__title-accent">
							de la création de sites web.
						</span>
					</motion.h1>
				</div>
				<motion.div
					className="blog-hero__side"
					variants={itemVariants}
				>
					<p>
						Guides pratiques, retours d&apos;expérience et
						explications techniques pour vous aider à mieux
						comprendre votre site internet.
					</p>
					<p className="blog-hero__count">
						{String(count).padStart(2, '0')} article
						{count > 1 ? 's' : ''} à découvrir
					</p>
				</motion.div>
			</motion.div>
		</section>
	);
}
