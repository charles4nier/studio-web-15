'use client';

import { useState } from 'react';
import './style.scss';
import PricingCard from './PricingCard';
import PricingModal from './PricingModal';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Tarifs() {
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedPackage, setSelectedPackage] = useState({ name: '', price: '', category: '' });

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
				'Sanity CMS (gestion contenu facile)',
				'Design adapté moderne',
				'100% Responsive (mobile/tablet/desktop)',
				'SEO optimisé',
				'Formulaire de contact',
				'Google Maps',
				'Formation Sanity 1h',
				'Hébergement Vercel gratuit',
				'SSL + CDN inclus'
			],
			recommended: false
		},
		{
			name: 'Pro',
			price: '2 000',
			description: 'Le plus populaire',
			features: [
				'10 pages',
				'Sanity CMS',
				'Design 100% sur mesure',
				'100% Responsive',
				'SEO optimisé avancé',
				'Formulaire de contact',
				'Google Maps',
				'Animations modernes (Framer Motion)',
				'Blog/Actualités',
				'Formation Sanity 2h',
				'Staging pour validation client',
				'Hébergement Vercel gratuit',
				'SSL + CDN inclus'
			],
			recommended: true
		},
		{
			name: 'Premium',
			price: 'Sur devis',
			description: 'Pour projets complexes',
			features: [
				'Pages illimitées',
				'Tout du Pro +',
				'Fonctionnalités sur mesure',
				'Design unique et complexe',
				'Intégrations API tierces',
				'Espace membre',
				'Multi-langues',
				'Réservations, paiements...'
			],
			recommended: false
		}
	];

	const ecommercePackages = [
		{
			name: 'Pro',
			price: '2 000',
			description: 'Shopify personnalisé',
			features: [
				'Solution 100% Shopify (thème Liquid)',
				'Interface admin Shopify complète',
				'Thème 100% custom pour votre marque',
				'Produits illimités',
				'Paiements Shopify Payments',
				'Gestion stocks automatique',
				'Comptes clients',
				'Apps essentielles (avis, newsletter, etc.)',
				'Automatisations emails avancées',
				'Formation complète 2h',
				'Client paie : Shopify 92€/mois'
			],
			recommended: true,
			clientCost: '92€/mois à Shopify'
		},
		{
			name: 'Headless',
			price: '2 500',
			description: 'Next.js + Shopify',
			features: [
				'Frontend Next.js sur mesure (comme vos sites vitrines)',
				'Backend Shopify (gestion produits/commandes)',
				'Design 100% liberté (pas limité par Shopify)',
				'Performance 95+ Google (ultra-rapide)',
				'SEO optimisé maximum',
				'Animations Framer Motion',
				'Produits illimités',
				'Interface admin Shopify pour gérer',
				'Formation 2h (Shopify + site)',
				'Client paie : Shopify 92€/mois',
				'Site hébergé sur Vercel (gratuit)'
			],
			recommended: false,
			clientCost: '92€/mois à Shopify'
		}
	];

	const maintenancePackages = [
		{
			name: 'Hébergement seul',
			price: '0',
			description: 'Vous gérez en autonomie',
			features: [
				'Hébergement Vercel gratuit',
				'SSL inclus',
				'CDN mondial',
				'Backups automatiques',
				'Vous gérez via Sanity/Shopify'
			],
			unit: '€/mois'
		},
		{
			name: 'Pack Sérénité',
			price: '39',
			description: 'Recommandé',
			features: [
				'Tout de l\'hébergement gratuit +',
				'Support prioritaire (email/tél)',
				'Mises à jour mensuelles',
				'Backups renforcés',
				'Modifications mineures (1h/mois)',
				'Monitoring de disponibilité'
			],
			unit: '€/mois',
			recommended: true
		},
		{
			name: 'Pack Premium',
			price: '49',
			description: 'Pour e-commerce',
			features: [
				'Tout du Pack Sérénité +',
				'Support illimité',
				'Modifications incluses (2h/mois)',
				'Google Analytics suivi',
				'Optimisations SEO mensuelles',
				'Conseils stratégie digitale'
			],
			unit: '€/mois'
		}
	];

	return (
		<div className="tarifs">
			{/* Hero */}
			<section className="tarifs-hero">
				<motion.div
					className="container"
					variants={heroVariants}
					initial="hidden"
					animate="visible"
				>
					<div className="tarifs-hero__text-reveal">
						<motion.h1 className="tarifs-hero__title" variants={itemVariants}>
							Nos tarifs
						</motion.h1>
					</div>
					<div className="tarifs-hero__text-reveal">
						<motion.p className="tarifs-hero__subtitle" variants={itemVariants}>
							Transparents, compétitifs, sans surprise. Technologie moderne au prix du
							template WordPress.
						</motion.p>
					</div>
				</motion.div>
			</section>

			{/* Stack Tech */}
			<motion.section
				className="tech-stack"
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: '-100px' }}
				transition={{ duration: 0.6, ease: 'easeOut' }}
			>
				<div className="container">
					<h2 className="tech-stack__title">Pourquoi nos sites sont différents ?</h2>
					<div className="tech-stack__grid">
						<div className="tech-feature">
							<div className="tech-feature__icon">⚡</div>
							<h3 className="tech-feature__title">Next.js 14</h3>
							<p className="tech-feature__description">
								Framework React moderne. Sites 10x plus rapides que WordPress. Score
								Google 95+.
							</p>
						</div>
						<div className="tech-feature">
							<div className="tech-feature__icon">🎨</div>
							<h3 className="tech-feature__title">Sanity CMS</h3>
							<p className="tech-feature__description">
								Interface moderne et intuitive. Modifiez votre contenu facilement, sans
								développeur.
							</p>
						</div>
						<div className="tech-feature">
							<div className="tech-feature__icon">🛍️</div>
							<h3 className="tech-feature__title">Shopify</h3>
							<p className="tech-feature__description">
								La meilleure plateforme e-commerce. Gestion simple, paiements sécurisés,
								évolutif.
							</p>
						</div>
						<div className="tech-feature">
							<div className="tech-feature__icon">🚀</div>
							<h3 className="tech-feature__title">Vercel</h3>
							<p className="tech-feature__description">
								Hébergement premium gratuit. SSL, CDN mondial, backups automatiques.
								Infrastructure d'entreprise.
							</p>
						</div>
					</div>
				</div>
			</motion.section>

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
							Next.js + Sanity CMS · Hébergement gratuit · Design moderne
						</p>
					</div>
					<div className="pricing-grid">
						{vitrinePackages.map((pkg, index) => (
							<PricingCard 
								key={index} 
								{...pkg} 
								onSelect={() => handleSelectPackage(pkg.name, pkg.price === 'Sur devis' ? 'Sur devis' : pkg.price + '€', 'Site vitrine')}
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
							Shopify Standard (92€/mois) · Solutions professionnelles uniquement
						</p>
						<div className="ecommerce-explanation">
							<p className="ecommerce-explanation__text">
								<strong>Pro</strong> : Shopify classique avec thème 100% custom. Interface admin
								Shopify complète pour tout gérer facilement.
							</p>
							<p className="ecommerce-explanation__text">
								<strong>Headless</strong> : Frontend Next.js ultra-performant + Backend Shopify.
								Performance maximale, SEO optimisé, même facilité de gestion via l'admin Shopify.
							</p>
						</div>
					</div>
					<div className="pricing-grid">
						{ecommercePackages.map((pkg, index) => (
							<PricingCard 
								key={index} 
								{...pkg} 
								onSelect={() => handleSelectPackage(pkg.name, pkg.price === 'Sur devis' ? 'Sur devis' : pkg.price + '€', 'E-commerce')}
							/>
						))}
					</div>
				</div>
			</motion.section>

			{/* Maintenance */}
			<motion.section
				className="pricing-section pricing-section--maintenance"
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: '-100px' }}
				transition={{ duration: 0.6, ease: 'easeOut' }}
			>
				<div className="container">
					<div className="pricing-section__header">
						<h2 className="pricing-section__title">Maintenance (optionnel)</h2>
						<p className="pricing-section__subtitle">
							Pas d'abonnement obligatoire · Vous choisissez selon vos besoins
						</p>
					</div>
					<div className="pricing-grid pricing-grid--maintenance">
						{maintenancePackages.map((pkg, index) => (
							<PricingCard 
								key={index} 
								{...pkg} 
								onSelect={() => handleSelectPackage(pkg.name, pkg.price + (pkg.unit || '€'), 'Maintenance')}
							/>
						))}
					</div>
				</div>
			</motion.section>

			{/* CTA */}
			<motion.section
				className="cta-section"
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: '-100px' }}
				transition={{ duration: 0.6, ease: 'easeOut' }}
			>
				<div className="container">
					<h2 className="cta-section__title">Prêt à démarrer votre projet ?</h2>
					<p className="cta-section__subtitle">
						Discutons de vos besoins et trouvons la solution idéale ensemble.
					</p>
					<Link href="/contact" className="button-primary">
						Demander un devis gratuit
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
		</div>
	);
}
