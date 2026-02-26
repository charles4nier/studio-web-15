'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import StudioModal from '@shared/components/StudioModal';
import './style.scss';

interface PricingModalProps {
	isOpen: boolean;
	onClose: () => void;
	packageName: string;
	packagePrice: string;
	packageCategory: string;
}

const maintenanceOptions = [
	{ id: 'none', name: 'Hébergement seul', price: 0 },
	{ id: 'serenite', name: 'Pack Sérénité', price: 39 },
	{ id: 'premium', name: 'Pack Premium', price: 49 }
];

export default function PricingModal({ isOpen, onClose, packageName, packagePrice, packageCategory }: PricingModalProps) {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: ''
	});
	const [selectedMaintenance, setSelectedMaintenance] = useState('none');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const handleChange = (field: string, value: string) => {
		setFormData({ ...formData, [field]: value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		const selectedMaintenancePack = maintenanceOptions.find(opt => opt.id === selectedMaintenance);
		const maintenanceLabel = selectedMaintenancePack
			? `${selectedMaintenancePack.name}${selectedMaintenancePack.price ? ` (${selectedMaintenancePack.price}€/mois)` : ''}`
			: '';

		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: formData.name,
					email: formData.email,
					phone: formData.phone,
					source: 'Demande express (Tarifs)',
					packageName,
					packagePrice,
					packageCategory,
					maintenance: maintenanceLabel
				})
			});
			const data = await res.json().catch(() => ({}));
			if (!res.ok) {
				alert(data.error || "Une erreur s'est produite. Réessayez ou écrivez à contact@studioweb15.fr");
				return;
			}
			setIsSuccess(true);
			setTimeout(() => {
				onClose();
				setIsSuccess(false);
				setFormData({ name: '', email: '', phone: '' });
			}, 3000);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<StudioModal
			isOpen={isOpen}
			onClose={onClose}
			ariaLabel="Formulaire de demande express"
			gradientId="tarifs"
			showCloseButton={true}
		>
			<motion.div 
				className="pricing-modal__content"
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 20 }}
				transition={{ duration: 0.3, delay: 0.1 }}
			>
					{isSuccess ? (
						<motion.div
							className="pricing-modal__success"
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
						>
							<div className="pricing-modal__success-icon">✓</div>
							<h2>Demande envoyée !</h2>
							<p>Merci {formData.name} ! On vous recontacte sous 24h pour discuter de votre projet.</p>
						</motion.div>
					) : (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 }}
						>
					<div className="pricing-modal__header">
						<h2>Démarrage rapide</h2>
						<div className="pricing-modal__package">
							<span className="pricing-modal__package-name">{packageCategory} - {packageName}</span>
							<span className="pricing-modal__package-price">{packagePrice}</span>
						</div>
						<p>Laissez-nous vos coordonnées, on vous recontacte très vite pour lancer le projet !</p>
					</div>

							<form onSubmit={handleSubmit} className="pricing-modal__form">
								<div className="pricing-modal__form-group">
									<label htmlFor="modal-name">Nom / Entreprise *</label>
									<input
										type="text"
										id="modal-name"
										value={formData.name}
										onChange={(e) => handleChange('name', e.target.value)}
										required
										placeholder="Votre nom ou entreprise"
									/>
								</div>

								<div className="pricing-modal__form-group">
									<label htmlFor="modal-email">Email *</label>
									<input
										type="email"
										id="modal-email"
										value={formData.email}
										onChange={(e) => handleChange('email', e.target.value)}
										required
										placeholder="votre@email.com"
									/>
								</div>

								<div className="pricing-modal__form-group">
									<label htmlFor="modal-phone">Téléphone *</label>
									<input
										type="tel"
										id="modal-phone"
										value={formData.phone}
										onChange={(e) => handleChange('phone', e.target.value)}
										required
										placeholder="06 12 34 56 78"
									/>
								</div>

								{/* Sélection maintenance */}
								<div className="pricing-modal__maintenance">
									<label className="pricing-modal__maintenance-label">Maintenance</label>
									<div className="pricing-modal__maintenance-options">
										{maintenanceOptions.map((option) => (
											<button
												key={option.id}
												type="button"
												className={`pricing-modal__maintenance-option ${selectedMaintenance === option.id ? 'active' : ''}`}
												onClick={() => setSelectedMaintenance(option.id)}
											>
												<span className="pricing-modal__maintenance-option-name">{option.name}</span>
												<span className="pricing-modal__maintenance-option-price">
													{option.price === 0 ? 'Gratuit' : `${option.price}€/mois`}
												</span>
											</button>
										))}
									</div>
								</div>

								<button
									type="submit"
									className="button-primary"
									disabled={isSubmitting || !formData.name || !formData.email || !formData.phone}
								>
									{isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
								</button>
							</form>
						</motion.div>
					)}
			</motion.div>
		</StudioModal>
	);
}
