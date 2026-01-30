'use client';

import { motion } from 'framer-motion';
import StudioModal from '@shared/components/StudioModal';
import './style.scss';

interface MaintenanceModalProps {
	isOpen: boolean;
	onClose: () => void;
}

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

export default function MaintenanceModal({ isOpen, onClose }: MaintenanceModalProps) {
	return (
		<StudioModal
			isOpen={isOpen}
			onClose={onClose}
			ariaLabel="Options de maintenance"
			gradientId="tarifs"
			showCloseButton={true}
		>
			<motion.div
				className="maintenance-modal__content"
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 20 }}
				transition={{ duration: 0.3, delay: 0.1 }}
			>
				<div className="maintenance-modal__header">
					<h2>Maintenance (optionnel)</h2>
					<p>Pas d&apos;abonnement obligatoire. Vous choisissez selon vos besoins.</p>
				</div>

				<div className="maintenance-modal__grid">
					{maintenancePackages.map((pkg, index) => (
						<div
							key={index}
							className={`maintenance-card ${pkg.recommended ? 'maintenance-card--recommended' : ''}`}
						>
							{pkg.recommended && <div className="maintenance-card__badge">Recommandé</div>}

							<div className="maintenance-card__header">
								<h3 className="maintenance-card__name">{pkg.name}</h3>
								<div className="maintenance-card__price">
									<span className="maintenance-card__amount">{pkg.price}</span>
									<span className="maintenance-card__unit">{pkg.unit}</span>
								</div>
								<p className="maintenance-card__description">{pkg.description}</p>
							</div>

							<ul className="maintenance-card__features">
								{pkg.features.map((feature, i) => (
									<li key={i}>
										<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
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
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</motion.div>
		</StudioModal>
	);
}
