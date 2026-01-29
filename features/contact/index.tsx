'use client';

import ContactWizard from './ContactWizard';
import { motion } from 'framer-motion';
import './style.scss';

export default function Contact() {
	const heroVariants = {
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
		<div className="contact">
			<section className="contact-hero">
				<motion.div
					className="container"
					variants={heroVariants}
					initial="hidden"
					animate="visible"
				>
					<div className="contact-hero__text-reveal">
						<motion.h1 className="contact-hero__title" variants={itemVariants}>
							Démarrons votre projet
						</motion.h1>
					</div>
					<div className="contact-hero__text-reveal">
						<motion.p className="contact-hero__subtitle" variants={itemVariants}>
							Quelques clics pour nous en dire plus. On vous répond sous 24h.
						</motion.p>
					</div>
				</motion.div>
			</section>

			<motion.section
				className="contact-wizard-section"
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: '-100px' }}
				transition={{ duration: 0.6, ease: 'easeOut' }}
			>
				<div className="container">
					<ContactWizard />
				</div>
			</motion.section>
		</div>
	);
}
