'use client';

import { useState, useEffect, useRef } from 'react';
import './style.scss';
import PricingCard from './PricingCard';
import PricingModal from './PricingModal';
import MaintenanceModal from './MaintenanceModal';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Tarifs() {
	const [modalOpen, setModalOpen] = useState(false);
	const [maintenanceModalOpen, setMaintenanceModalOpen] = useState(false);
	const [selectedPackage, setSelectedPackage] = useState({ name: '', price: '', category: '' });
	
	// Mobile accordion
	const [mobileCategory, setMobileCategory] = useState<'vitrine' | 'ecommerce'>('vitrine');
	const [expandedCards, setExpandedCards] = useState<number[]>([]);

	const handleSelectPackage = (name: string, price: string, category: string) => {
		setSelectedPackage({ name, price, category });
		setModalOpen(true);
	};


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
	const vitrinePackages = [
		{
			name: 'Starter',
			price: '1 500',
			description: 'Idéal pour démarrer',
			features: [
				'5 pages',
				'Back office',
				'100% Responsive',
				'Accessibilité (WCAG 2.1)',
				'SEO optimisé',
				'Formulaire de contact',
				'Google Maps',
				'Formation 1h',
				'SSL + CDN inclus'
			],
			recommended: false
		},
		{
			name: 'Pro',
			price: '2 900',
			description: 'Le plus populaire',
			features: [
				'10 pages',
				'Back office',
				'100% Responsive',
				'Accessibilité (WCAG 2.1)',
				'SEO optimisé',
				'Formulaire de contact',
				'Google Maps',
				'Formation 2h',
				'SSL + CDN inclus'
			],
			recommended: true
		},
		{
			name: 'Premium',
			price: 'Sur devis',
			description: 'Expérience immersive',
			features: [
				'Tout du Pro +',
				'Animations sophistiquées (Framer Motion avancé)',
				'Effets visuels Canvas/SVG poussés',
				'Scroll narratif & parallax',
				'Micro-interactions sur mesure',
				'Transitions morphing/shader CSS',
				'Intégrations complexes (APIs, CRM)',
				'Espace membre avancé',
				'Multi-langues',
				'Fonctionnalités métier sur mesure',
				'Design système complet'
			],
			recommended: false
		}
	];

	const ecommercePackages = [
		{
			name: 'Pro',
			price: '2 000',
			prefix: 'Dès',
			description: 'Shopify personnalisé',
			features: [
				'Solution 100% Shopify (thème Liquid)',
				'Interface admin Shopify complète',
				'Thème 100% custom pour votre marque',
				'Accessibilité e-commerce (WCAG 2.1)',
				'Produits illimités',
				'Paiements Shopify Payments',
				'Gestion stocks automatique',
				'Comptes clients',
				'Apps essentielles (avis, newsletter)',
				'Automatisations emails',
				'Formation complète 2h',
			],
			recommended: true,
			clientCost: '29€/mois à Shopify'
		},
		{
			name: 'Premium',
			price: 'Sur devis',
			description: 'Expérience immersive',
			features: [
				'Tout du Pro +',
				'Animations sophistiquées (Framer Motion avancé)',
				'Effets visuels Canvas/SVG poussés',
				'Configurateur produit interactif',
				'Scroll narratif & parallax',
				'Micro-interactions sur mesure',
				'Transitions morphing/shader CSS',
				'Intégrations complexes (CRM, ERP, APIs)',
				'Personnalisation avancée',
				'Design système complet',
				'Formation 3h dédiée'
			],
			recommended: false,
			clientCost: '29€/mois à Shopify'
		}
	];

	// Réinitialiser l'expansion quand on change de catégorie
	useEffect(() => {
		setExpandedCards([]);
	}, [mobileCategory]);

	const currentPackages = mobileCategory === 'vitrine' ? vitrinePackages : ecommercePackages;

	const toggleCard = (index: number) => {
		setExpandedCards(prev => 
			prev.includes(index) 
				? prev.filter(i => i !== index)
				: [...prev, index]
		);
	};

	return (
		<div className="tarifs">
			{/* Hero */}
			<section className="tarifs-hero">
				<div className="grid-lines tarifs-hero__grid" />
				<motion.div
					className="container tarifs-hero__inner"
					variants={heroVariants}
					initial="hidden"
					animate="visible"
				>
					<div>
						<motion.p className="eyebrow" variants={itemVariants}>
							Tarifs
						</motion.p>
						<motion.h1 className="tarifs-hero__title" variants={itemVariants}>
							Des tarifs clairs pour un site internet
							<span className="acid-text tarifs-hero__title-accent">
								qui vous ressemble.
							</span>
						</motion.h1>
					</div>
					<motion.div className="tarifs-hero__side" variants={itemVariants}>
						<p>
							Sites vitrines et boutiques en ligne développés avec des
							technologies modernes (Next.js, Sanity CMS, Shopify) — au
							prix d&apos;un template classique, mais plus rapides et plus
							faciles à faire évoluer.
						</p>
						<p className="tarifs-hero__highlight">À partir de 500 €</p>
					</motion.div>
				</motion.div>
			</section>

			{/* Offre phare */}
			<motion.section
				className="band offer-highlight"
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: '-100px' }}
				transition={{ duration: 0.6, ease: 'easeOut' }}
			>
				<div className="container offer-highlight__inner">
					<div className="offer-highlight__info">
						<span className="offer-highlight__badge">Site one-page</span>
						<h2 className="offer-highlight__title">
							Un site one-page dès 500&nbsp;€
						</h2>
						<p className="offer-highlight__text">
							Une page unique, claire et efficace, pour présenter votre
							activité. Ajoutez un backoffice pour gérer vos contenus
							vous-même, dès que vous en avez besoin.
						</p>
					</div>
					<button
						className="button-primary offer-highlight__action"
						onClick={() => handleSelectPackage('Landing', '500€', 'Site vitrine')}
					>
						Choisir cette offre
					</button>
				</div>
			</motion.section>

			{/* Desktop : Grilles complètes */}
			<div className="pricing-desktop">
				{/* Sites Vitrines */}
				<motion.section
					className="pricing-section"
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 0.6, ease: 'easeOut' }}
				>
					<div className="container">
						<div className="pricing-section__header">
							<h2 className="pricing-section__title">Sites vitrines</h2>
							<p className="pricing-section__subtitle">
								Hébergement gratuit · Design moderne
							</p>
						</div>
						<div className="pricing-grid">
							{vitrinePackages.map((pkg, index) => (
								<PricingCard 
									key={index} 
									{...pkg} 
									onSelect={() => handleSelectPackage(pkg.name, pkg.price === 'Sur devis' ? 'Sur devis' : pkg.price + '€', 'Site vitrine')}
									onMaintenanceClick={() => setMaintenanceModalOpen(true)}
								/>
							))}
						</div>
					</div>
				</motion.section>

				{/* E-commerce */}
				<motion.section
					className="pricing-section"
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 0.6, ease: 'easeOut' }}
				>
					<div className="container">
						<div className="pricing-section__header">
							<h2 className="pricing-section__title">Boutiques en ligne</h2>
							<p className="pricing-section__subtitle">
								Shopify Standard (dès 29/mois) · Solutions professionnelles uniquement
							</p>
						</div>
						<div className="pricing-grid">
							{ecommercePackages.map((pkg, index) => (
								<PricingCard 
									key={index} 
									{...pkg} 
									onSelect={() => handleSelectPackage(pkg.name, pkg.price === 'Sur devis' ? 'Sur devis' : pkg.price + '€', 'E-commerce')}
									onMaintenanceClick={() => setMaintenanceModalOpen(true)}
								/>
							))}
						</div>
					</div>
				</motion.section>
			</div>

			{/* Mobile : Slideshow */}
			<div className="pricing-mobile">
				<motion.section
					className="pricing-section"
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 0.6, ease: 'easeOut' }}
				>
					<div className="container">
						{/* Sélecteur de catégorie */}
						<div className="pricing-mobile__selector">
							<button
								className={`pricing-mobile__selector-btn ${mobileCategory === 'vitrine' ? 'active' : ''}`}
								onClick={() => setMobileCategory('vitrine')}
							>
								Sites vitrines
							</button>
							<button
								className={`pricing-mobile__selector-btn ${mobileCategory === 'ecommerce' ? 'active' : ''}`}
								onClick={() => setMobileCategory('ecommerce')}
							>
								Sites marchands
							</button>
						</div>
						{/* Accordion */}
						<div className="pricing-mobile__accordion">
							<motion.p 
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}>
								{ mobileCategory === 'vitrine' ? 'Hébergement gratuit · Design moderne' : 'Shopify Standard (29€/mois) · Solutions professionnelles uniquement'}
							</motion.p>
							{currentPackages.map((pkg, index) => {
								const isExpanded = expandedCards.includes(index);
								const categoryName = mobileCategory === 'vitrine' ? 'Site vitrine' : 'E-commerce';

								return (
									<motion.div
										key={`${mobileCategory}-${index}`}
										className="pricing-mobile__card-wrapper"
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.1, duration: 0.4 }}
									>
										{/* Carte compacte */}
										<div className={`pricing-card-compact ${pkg.recommended ? 'pricing-card-compact--recommended' : ''}`}>
											{pkg.recommended && <div className="pricing-card__badge">Recommandé</div>}
											
											<div className="pricing-card__header">
												<h3 className="pricing-card__name">{pkg.name}</h3>
												<div className="pricing-card__price">
													{pkg.price !== 'Sur devis' ? (
														<>
															{'prefix' in pkg && pkg.prefix && (
																<span className="pricing-card__prefix">{pkg.prefix} </span>
															)}
															<span className="pricing-card__amount">{pkg.price}</span>
															<span className="pricing-card__unit">€</span>
														</>
													) : (
														<span className="pricing-card__custom">Sur devis</span>
													)}
												</div>
												<button
													className="pricing-card__maintenance-btn"
													onClick={(e) => {
														e.stopPropagation();
														setMaintenanceModalOpen(true);
													}}
												>
													+ Maintenance optionnelle
												</button>
												<p className="pricing-card__description">{pkg.description}</p>
											</div>

											

											{/* Features (déployables) */}
											<AnimatePresence>
												{isExpanded && (
													<motion.div
														initial={{ opacity: 0, height: 0 }}
														animate={{ opacity: 1, height: 'auto' }}
														exit={{ opacity: 0, height: 0 }}
														transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
														style={{ overflow: 'hidden' }}
														className="pricing-card__features-list-wrapper"
													>
														<ul className="pricing-card__features">
															{pkg.features.map((feature, idx) => (
																<motion.li
																	key={idx}
																	className="pricing-card__feature"
																	initial={{ opacity: 0, x: -10 }}
																	animate={{ opacity: 1, x: 0 }}
																	transition={{ delay: idx * 0.05, duration: 0.3 }}
																>
																	<svg
																		className="pricing-card__check"
																		width="20"
																		height="20"
																		viewBox="0 0 20 20"
																		fill="none"
																	>
																		<circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.1" />
																		<path
																			d="M6 10L9 13L14 7"
																			stroke="currentColor"
																			strokeWidth="2"
																			strokeLinecap="round"
																			strokeLinejoin="round"
																		/>
																	</svg>
																	{feature}
																</motion.li>
															))}
														</ul>

														{pkg.clientCost && (
															<div className="pricing-card__client-cost">
																<small>+ {pkg.clientCost}</small>
															</div>
														)}

														<button 
															onClick={() => handleSelectPackage(
																pkg.name,
																pkg.price === 'Sur devis' ? 'Sur devis' : pkg.price + '€',
																categoryName
															)}
															className={pkg.recommended ? 'button-primary' : 'button-secondary'}
														>
															{pkg.price === 'Sur devis' ? 'Nous contacter' : 'Choisir ce pack'}
														</button>
													</motion.div>
												)}
											</AnimatePresence>

											{/* Bouton toggle */}
											<button
												className="pricing-card-compact__toggle"
												onClick={() => toggleCard(index)}
												aria-label={isExpanded ? 'Réduire' : 'Voir plus'}
											>
												<motion.span
													key={isExpanded ? 'minus' : 'plus'}
													initial={{ opacity: 0, rotate: -90 }}
													animate={{ opacity: 1, rotate: 0 }}
													exit={{ opacity: 0, rotate: 90 }}
													transition={{ duration: 0.2 }}
												>
													{isExpanded ? '−' : '+'}
												</motion.span>
											</button>
										</div>
									</motion.div>
								);
							})}
						</div>
					</div>
				</motion.section>
			</div>

			{/* CTA */}
			<motion.section
				className="band cta-section"
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: '-100px' }}
				transition={{ duration: 0.6, ease: 'easeOut' }}
			>
				<div className="container cta-section__inner">
					<div>
						<p className="eyebrow">Votre projet</p>
						<h2 className="cta-section__title">
							Prêt à démarrer votre projet ?
						</h2>
						<p className="cta-section__text">
							Discutons de vos besoins et trouvons la solution idéale
							ensemble.
						</p>
					</div>
					<Link href="/contact" className="button-primary">
						Demander un devis gratuit
						<span aria-hidden="true">→</span>
					</Link>
				</div>
			</motion.section>

			{/* Modale express */}
			<PricingModal
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
				packageName={selectedPackage.name}
				packagePrice={selectedPackage.price}
				packageCategory={selectedPackage.category}
			/>

			{/* Modale maintenance */}
			<MaintenanceModal
				isOpen={maintenanceModalOpen}
				onClose={() => setMaintenanceModalOpen(false)}
			/>
		</div>
	);
}
