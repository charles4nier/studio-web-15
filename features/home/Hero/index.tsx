'use client';

import './style.scss';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface HeroProps {
	title: string;
	subtitle?: string;
	ctaLabel: string;
}

export default function Hero({ title, subtitle, ctaLabel }: HeroProps) {
	// Le titre peut contenir "||" pour séparer la partie normale de la
	// partie mise en avant en dégradé acide (ex: "Je crée...||clairement votre activité.")
	const [titleStart, titleAccent] = title.split('||');

	const containerVariants = {
		hidden: {},
		visible: {
			transition: {
				staggerChildren: 0.2
			}
		}
	};

	const itemVariants = {
		hidden: {
			y: 30,
			opacity: 0
		},
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.4,
				ease: [0.25, 0.1, 0.25, 1]
			}
		}
	};

	return (
		<section className="hero">
			<Image
				src="/hero-ember.jpg"
				alt=""
				fill
				priority
				className="hero__image"
				sizes="100vw"
			/>
			<div className="grid-lines hero__grid" />
			<div className="hero__scrim" />
			<div className="container">
				<motion.div
					className="hero__content"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<motion.h1 className="eyebrow" variants={itemVariants}>
						Création de sites internet à Aurillac, Cantal
					</motion.h1>

					<div className="hero__text-reveal">
						<motion.p
							className="hero__title"
							variants={itemVariants}
						>
							{titleStart}
							{titleAccent && (
								<span className="acid-text hero__title-accent">
									{titleAccent}
								</span>
							)}
						</motion.p>
					</div>

					{subtitle && (
						<div className="hero__text-reveal">
							<motion.p
								className="hero__subtitle"
								variants={itemVariants}
							>
								{subtitle}
							</motion.p>
						</div>
					)}

					<motion.div
						className="hero__actions"
						variants={itemVariants}
					>
						<Link href="/contact" className="button-primary">
							{ctaLabel}
							<span aria-hidden="true">→</span>
						</Link>
						<Link href="/realisations" className="hero__link">
							Voir les réalisations
						</Link>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
