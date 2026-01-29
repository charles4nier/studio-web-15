'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './style.scss';

interface PricingModalProps {
	isOpen: boolean;
	onClose: () => void;
	packageName: string;
	packagePrice: string;
	packageCategory: string;
}

export default function PricingModal({ isOpen, onClose, packageName, packagePrice, packageCategory }: PricingModalProps) {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: ''
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const handleChange = (field: string, value: string) => {
		setFormData({ ...formData, [field]: value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulation d'envoi
		await new Promise((resolve) => setTimeout(resolve, 1500));

		console.log('Demande express:', { 
			...formData, 
			category: packageCategory,
			package: packageName, 
			price: packagePrice 
		});
		setIsSubmitting(false);
		setIsSuccess(true);

		// Fermeture auto après succès
		setTimeout(() => {
			onClose();
			setIsSuccess(false);
			setFormData({ name: '', email: '', phone: '' });
		}, 3000);
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="pricing-modal"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.4, ease: 'easeInOut' }}
				>
				{/* Lignes animées (même style que le menu) */}
				<svg className="pricing-modal__wave" viewBox="0 0 1200 1000" preserveAspectRatio="none">
					<defs>
						<linearGradient id="modal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="#f97316">
								<animate attributeName="offset" values="0;1;0" dur="25s" repeatCount="indefinite" />
							</stop>
							<stop offset="50%" stopColor="#ec4899">
								<animate attributeName="offset" values="0.5;1.5;0.5" dur="25s" repeatCount="indefinite" />
							</stop>
							<stop offset="100%" stopColor="#f97316">
								<animate attributeName="offset" values="1;2;1" dur="25s" repeatCount="indefinite" />
							</stop>
						</linearGradient>
					</defs>
					<path 
						fill="none" 
						stroke="url(#modal-gradient)" 
						strokeWidth="2.5"
						opacity="0.2"
					>
						<animate 
							attributeName="d"
							dur="30s"
							repeatCount="indefinite"
							values="
								M 0 0 Q 200 150, 400 200 T 800 400 T 1200 1000;
								M 0 0 Q 220 130, 400 220 T 820 380 T 1200 1000;
								M 0 0 Q 180 170, 400 180 T 780 420 T 1200 1000;
								M 0 0 Q 200 150, 400 200 T 800 400 T 1200 1000
							"
						/>
					</path>
					<path 
						fill="none" 
						stroke="url(#modal-gradient)" 
						strokeWidth="2"
						opacity="0.15"
					>
						<animate 
							attributeName="d"
							dur="30s"
							repeatCount="indefinite"
							values="
								M 0 500 Q 90 630, 220 670 T 500 870 T 780 1000;
								M 0 500 Q 110 610, 220 690 T 520 850 T 780 1000;
								M 0 500 Q 70 650, 220 650 T 480 890 T 780 1000;
								M 0 500 Q 90 630, 220 670 T 500 870 T 780 1000
							"
						/>
					</path>
					<path 
						fill="none" 
						stroke="url(#modal-gradient)" 
						strokeWidth="1.8"
						opacity="0.12"
					>
						<animate 
							attributeName="d"
							dur="30s"
							repeatCount="indefinite"
							values="
								M 800 0 Q 920 80, 1050 100 T 1200 200;
								M 800 0 Q 940 60, 1050 120 T 1200 180;
								M 800 0 Q 900 100, 1050 80 T 1200 220;
								M 800 0 Q 920 80, 1050 100 T 1200 200
							"
						/>
					</path>
				</svg>

				{/* Bouton fermer */}
				<button className="pricing-modal__close" onClick={onClose} aria-label="Fermer">
					<span></span>
					<span></span>
				</button>

				{/* Contenu */}
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
			</motion.div>
			)}
		</AnimatePresence>
	);
}
