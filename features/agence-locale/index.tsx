'use client';

import './style.scss';
import { motion } from 'framer-motion';

export default function AgenceLocale() {
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

	const departments = [
		{
			name: 'Cantal (15)',
			icon: '📍',
			cities: ['Aurillac', 'Saint-Flour', 'Mauriac', 'Murat'],
			description: 'Secteur principal. Déplacements fréquents, rencontres en présentiel possibles.'
		},
		{
			name: 'Aveyron (12)',
			icon: '📍',
			cities: ['Rodez', 'Millau', 'Villefranche-de-Rouergue', 'Decazeville'],
			description: 'Accompagnement régulier. Disponible pour rendez-vous sur place.'
		},
		{
			name: 'Creuse (23)',
			icon: '📍',
			cities: ['Guéret', 'Aubusson', 'La Souterraine'],
			description: 'Accompagnement sur demande. Suivi de projet à distance ou en présentiel.'
		},
		{
			name: 'Corrèze (19)',
			icon: '📍',
			cities: ['Tulle', 'Brive-la-Gaillarde', 'Ussel'],
			description: 'Proximité géographique. Déplacements possibles pour vos projets.'
		},
		{
			name: 'Puy-de-Dôme (63)',
			icon: '📍',
			cities: ['Clermont-Ferrand', 'Riom', 'Thiers'],
			description: 'Secteur Auvergne. Accès facile pour rendez-vous et suivi de projet.'
		},
		{
			name: 'Haute-Loire (43)',
			icon: '📍',
			cities: ['Le Puy-en-Velay', 'Brioude', 'Yssingeaux'],
			description: 'Zone limitrophe. Accompagnement flexible selon vos besoins.'
		}
	];

	return (
		<div className="agence-locale">
			{/* Hero */}
			<section className="agence-hero">
				<motion.div
					className="container"
					variants={heroVariants}
					initial="hidden"
					animate="visible"
				>
					<div className="agence-hero__text-reveal">
						<motion.h1 className="agence-hero__title" variants={itemVariants}>
							Votre agence locale
						</motion.h1>
					</div>
					<div className="agence-hero__text-reveal">
						<motion.p className="agence-hero__subtitle" variants={itemVariants}>
							Agence web basée dans le Cantal. Nous accompagnons les entreprises d'Aurillac, Rodez, Guéret et
							des départements limitrophes du Massif Central.
						</motion.p>
					</div>
				</motion.div>
			</section>

			{/* Départements */}
			<motion.section
				className="departments-section"
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: '-100px' }}
				transition={{ duration: 0.6, ease: 'easeOut' }}
			>
				<div className="container">
					<div className="departments-grid">
						{departments.map((dept, index) => (
							<motion.div
								key={index}
								className="department-card"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: index * 0.1 }}
							>
								<div className="department-card__icon">{dept.icon}</div>
								<h3 className="department-card__name">{dept.name}</h3>
								<p className="department-card__description">{dept.description}</p>
								<div className="department-card__cities">
									{dept.cities.map((city, i) => (
										<span key={i} className="department-card__city">
											{city}
										</span>
									))}
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</motion.section>

			{/* Valeurs */}
			<motion.section
				className="values-section"
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: '-100px' }}
				transition={{ duration: 0.6, ease: 'easeOut' }}
			>
				<div className="container">
					<h2 className="values-section__title">Pourquoi choisir une agence locale ?</h2>
					<div className="values-grid">
						<div className="value-card">
							<div className="value-card__icon">🤝</div>
							<h3 className="value-card__title">Proximité</h3>
							<p className="value-card__description">
								Rencontres en présentiel possibles. On se déplace pour comprendre votre activité et
								vos besoins.
							</p>
						</div>
						<div className="value-card">
							<div className="value-card__icon">💬</div>
							<h3 className="value-card__title">Réactivité</h3>
							<p className="value-card__description">
								Un interlocuteur unique, des réponses rapides. Pas de ticket de support, on se parle
								directement.
							</p>
						</div>
						<div className="value-card">
							<div className="value-card__icon">💰</div>
							<h3 className="value-card__title">Tarifs justes</h3>
							<p className="value-card__description">
								Prix adaptés aux budgets des TPE/PME locales. Transparence totale, sans frais cachés.
							</p>
						</div>
						<div className="value-card">
							<div className="value-card__icon">🚀</div>
							<h3 className="value-card__title">Tech moderne</h3>
							<p className="value-card__description">
								Next.js, Shopify, performances optimales. La technologie des grandes agences, sans le
								jargon.
							</p>
						</div>
					</div>
				</div>
			</motion.section>

			{/* CTA */}
			<motion.section
				className="agence-cta"
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: '-100px' }}
				transition={{ duration: 0.6, ease: 'easeOut' }}
			>
				<div className="container">
					<h2 className="agence-cta__title">Un projet web dans votre région ?</h2>
					<p className="agence-cta__subtitle">
						Discutons-en autour d&apos;un café ou en visio. Devis gratuit sous 24h.
					</p>
					<a href="/contact" className="button-primary">
						Me contacter
					</a>
				</div>
			</motion.section>
		</div>
	);
}
