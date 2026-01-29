'use client';

import './style.scss';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface HeroProps {
	title: string;
	subtitle?: string;
	ctaLabel: string;
}

export default function Hero({ title, subtitle, ctaLabel }: HeroProps) {
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
			<div className="container">
				<motion.div
					className="hero__content"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<div className="hero__text-reveal">
						<motion.h1 className="hero__title" variants={itemVariants}>
							{title}
						</motion.h1>
					</div>

					{subtitle && (
						<div className="hero__text-reveal">
							<motion.p className="hero__subtitle" variants={itemVariants}>
								{subtitle}
							</motion.p>
						</div>
					)}

					<div className="hero__text-reveal">
						<motion.div variants={itemVariants}>
							<Link href="/contact" className="button-primary">
								<span>{ctaLabel}</span>
							</Link>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
