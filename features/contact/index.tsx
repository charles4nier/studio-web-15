'use client';

import ContactWizard from './ContactWizard';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import './style.scss';

export default function Contact() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
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
				<div className="grid-lines contact-hero__grid" />
				<motion.div
					className="container contact-hero__inner"
					variants={heroVariants}
					initial="hidden"
					animate="visible"
				>
					<div>
						<motion.p className="eyebrow" variants={itemVariants}>
							Contact
						</motion.p>
						<motion.h1 className="contact-hero__title" variants={itemVariants}>
							Démarrons
							<span className="acid-text contact-hero__title-accent">
								votre projet.
							</span>
						</motion.h1>
					</div>
					<motion.div className="contact-hero__side" variants={itemVariants}>
						<p>
							Quelques clics pour nous en dire plus sur votre activité et
							vos besoins.
						</p>
						<p className="contact-hero__highlight">Réponse sous 24h</p>
					</motion.div>
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
