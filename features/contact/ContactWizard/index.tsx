'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OptionCard from './OptionCard';
import './style.scss';

interface FormData {
	projectType: string;
	budget: string;
	timing: string;
	name: string;
	email: string;
	phone: string;
	message: string;
}

export default function ContactWizard() {
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState<FormData>({
		projectType: '',
		budget: '',
		timing: '',
		name: '',
		email: '',
		phone: '',
		message: ''
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const wizardRef = useRef<HTMLDivElement>(null);

	const totalSteps = 4;

	// Scroll vers le wizard sur mobile uniquement quand on change d’étape (pas à l’arrivée sur la page)
	const prevStepRef = useRef(step);
	useEffect(() => {
		if (wizardRef.current && window.innerWidth <= 768 && step !== prevStepRef.current) {
			prevStepRef.current = step;
			wizardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
		} else {
			prevStepRef.current = step;
		}
	}, [step]);

	const handleOptionSelect = (field: keyof FormData, value: string) => {
		setFormData({ ...formData, [field]: value });
		setTimeout(() => {
			if (step < totalSteps) {
				setStep(step + 1);
			}
		}, 300);
	};

	const handleInputChange = (field: keyof FormData, value: string) => {
		setFormData({ ...formData, [field]: value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: formData.name,
					email: formData.email,
					phone: formData.phone || undefined,
					message: formData.message || undefined,
					source: 'Contact',
					projectType: formData.projectType || undefined,
					budget: formData.budget || undefined,
					timing: formData.timing || undefined
				})
			});
			const data = await res.json().catch(() => ({}));
			if (!res.ok) {
				alert(data.error || "Une erreur s'est produite. Réessayez ou écrivez à contact@studioweb15.fr");
				return;
			}
			setIsSuccess(true);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleBack = () => {
		if (step > 1) {
			setStep(step - 1);
		}
	};

	const stepVariants = {
		enter: { opacity: 0, x: 50 },
		center: { opacity: 1, x: 0 },
		exit: { opacity: 0, x: -50 }
	};

	if (isSuccess) {
		return (
			<motion.div
				className="wizard-success"
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
			>
				<div className="wizard-success__icon">✓</div>
				<h2 className="wizard-success__title">Message envoyé !</h2>
				<p className="wizard-success__text">
					Merci {formData.name} ! On revient vers vous sous 24h à l'adresse {formData.email}.
				</p>
			</motion.div>
		);
	}

	return (
		<div className="contact-wizard" ref={wizardRef}>
			{/* Progress bar */}
			<div className="wizard-progress">
				<div className="wizard-progress__bar">
					<motion.div
						className="wizard-progress__fill"
						initial={{ width: '0%' }}
						animate={{ width: `${(step / totalSteps) * 100}%` }}
						transition={{ duration: 0.3 }}
					/>
				</div>
				<p className="wizard-progress__text">
					Étape {step} sur {totalSteps}
				</p>
			</div>

			<AnimatePresence mode="wait">
				{/* Step 1: Project Type */}
				{step === 1 && (
					<motion.div
						key="step1"
						variants={stepVariants}
						initial="enter"
						animate="center"
						exit="exit"
						transition={{ duration: 0.3 }}
						className="wizard-step"
					>
						<h2 className="wizard-step__title">Quel type de projet ?</h2>
						<div className="wizard-options">
							<OptionCard
								icon="🌐"
								title="Site vitrine"
								description="Présenter mon activité, mes services"
								isSelected={formData.projectType === 'vitrine'}
								onClick={() => handleOptionSelect('projectType', 'vitrine')}
							/>
							<OptionCard
								icon="🛍️"
								title="E-commerce"
								description="Vendre mes produits en ligne"
								isSelected={formData.projectType === 'ecommerce'}
								onClick={() => handleOptionSelect('projectType', 'ecommerce')}
							/>
							<OptionCard
								icon="💡"
								title="Autre projet"
								description="Application, refonte, conseil..."
								isSelected={formData.projectType === 'autre'}
								onClick={() => handleOptionSelect('projectType', 'autre')}
							/>
						</div>
					</motion.div>
				)}

				{/* Step 2: Budget */}
				{step === 2 && (
					<motion.div
						key="step2"
						variants={stepVariants}
						initial="enter"
						animate="center"
						exit="exit"
						transition={{ duration: 0.3 }}
						className="wizard-step"
					>
						<h2 className="wizard-step__title">Quel budget envisagez-vous ?</h2>
						<div className="wizard-options">
							{formData.projectType === 'vitrine' ? (
								<>
									<OptionCard
										icon="🌱"
										title="Starter"
										description="1 500€ · 5 pages"
										isSelected={formData.budget === 'starter'}
										onClick={() => handleOptionSelect('budget', 'starter')}
									/>
									<OptionCard
										icon="🚀"
										title="Pro"
										description="2 000€ · 10 pages · Recommandé"
										isSelected={formData.budget === 'pro'}
										onClick={() => handleOptionSelect('budget', 'pro')}
										recommended
									/>
									<OptionCard
										icon="⭐"
										title="Premium"
										description="Sur mesure · Projet complexe"
										isSelected={formData.budget === 'premium'}
										onClick={() => handleOptionSelect('budget', 'premium')}
									/>
								</>
							) : formData.projectType === 'ecommerce' ? (
								<>
									<OptionCard
										icon="🚀"
										title="Pro"
										description="2 000€ · Shopify custom"
										isSelected={formData.budget === 'pro'}
										onClick={() => handleOptionSelect('budget', 'pro')}
										recommended
									/>
									<OptionCard
										icon="⚡"
										title="Headless"
										description="2 500€ · Next.js + Shopify"
										isSelected={formData.budget === 'headless'}
										onClick={() => handleOptionSelect('budget', 'headless')}
									/>
								</>
							) : (
								<>
									<OptionCard
										icon="💰"
										title="Budget défini"
										description="J'ai un budget précis en tête"
										isSelected={formData.budget === 'defini'}
										onClick={() => handleOptionSelect('budget', 'defini')}
									/>
									<OptionCard
										icon="💬"
										title="À discuter"
										description="Je souhaite en parler avec vous"
										isSelected={formData.budget === 'discuter'}
										onClick={() => handleOptionSelect('budget', 'discuter')}
									/>
								</>
							)}
						</div>
						<button className="wizard-back" onClick={handleBack}>
							← Retour
						</button>
					</motion.div>
				)}

				{/* Step 3: Timing */}
				{step === 3 && (
					<motion.div
						key="step3"
						variants={stepVariants}
						initial="enter"
						animate="center"
						exit="exit"
						transition={{ duration: 0.3 }}
						className="wizard-step"
					>
						<h2 className="wizard-step__title">Quand souhaitez-vous démarrer ?</h2>
						<div className="wizard-options">
							<OptionCard
								icon="🔥"
								title="Urgent"
								description="Dès que possible"
								isSelected={formData.timing === 'urgent'}
								onClick={() => handleOptionSelect('timing', 'urgent')}
							/>
							<OptionCard
								icon="📅"
								title="1 mois"
								description="Dans les semaines à venir"
								isSelected={formData.timing === '1mois'}
								onClick={() => handleOptionSelect('timing', '1mois')}
							/>
							<OptionCard
								icon="🕐"
								title="Flexible"
								description="Pas de contrainte de temps"
								isSelected={formData.timing === 'flexible'}
								onClick={() => handleOptionSelect('timing', 'flexible')}
							/>
						</div>
						<button className="wizard-back" onClick={handleBack}>
							← Retour
						</button>
					</motion.div>
				)}

				{/* Step 4: Final Form */}
				{step === 4 && (
					<motion.div
						key="step4"
						variants={stepVariants}
						initial="enter"
						animate="center"
						exit="exit"
						transition={{ duration: 0.3 }}
						className="wizard-step"
					>
						<h2 className="wizard-step__title">Pour finir, vos coordonnées</h2>

						{/* Récap */}
						<div className="wizard-recap">
							<p className="wizard-recap__item">
								<strong>Projet :</strong>{' '}
								{formData.projectType === 'vitrine'
									? 'Site vitrine'
									: formData.projectType === 'ecommerce'
										? 'E-commerce'
										: 'Autre projet'}
							</p>
							<p className="wizard-recap__item">
								<strong>Budget :</strong>{' '}
								{formData.budget.charAt(0).toUpperCase() + formData.budget.slice(1)}
							</p>
							<p className="wizard-recap__item">
								<strong>Timing :</strong>{' '}
								{formData.timing === 'urgent'
									? 'Urgent'
									: formData.timing === '1mois'
										? '1 mois'
										: 'Flexible'}
							</p>
						</div>

						<form onSubmit={handleSubmit} className="wizard-form">
							<div className="wizard-form__group">
								<label htmlFor="name" className="wizard-form__label">
									Nom / Entreprise *
								</label>
								<input
									type="text"
									id="name"
									className="wizard-form__input"
									value={formData.name}
									onChange={(e) => handleInputChange('name', e.target.value)}
									required
								/>
							</div>

							<div className="wizard-form__group">
								<label htmlFor="email" className="wizard-form__label">
									Email *
								</label>
								<input
									type="email"
									id="email"
									className="wizard-form__input"
									value={formData.email}
									onChange={(e) => handleInputChange('email', e.target.value)}
									required
								/>
							</div>

							<div className="wizard-form__group">
								<label htmlFor="phone" className="wizard-form__label">
									Téléphone (optionnel)
								</label>
								<input
									type="tel"
									id="phone"
									className="wizard-form__input"
									value={formData.phone}
									onChange={(e) => handleInputChange('phone', e.target.value)}
									placeholder="06 12 34 56 78"
								/>
							</div>

							<div className="wizard-form__group">
								<label htmlFor="message" className="wizard-form__label">
									Votre message (optionnel)
								</label>
								<textarea
									id="message"
									className="wizard-form__textarea"
									rows={4}
									value={formData.message}
									onChange={(e) => handleInputChange('message', e.target.value)}
									placeholder="Décrivez-nous votre projet en quelques mots..."
								/>
							</div>

							<div className="wizard-form__actions">
								<button type="button" className="wizard-back" onClick={handleBack}>
									← Retour
								</button>
								<button
									type="submit"
									className="button-primary"
									disabled={isSubmitting || !formData.name || !formData.email}
								>
									{isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
								</button>
							</div>
						</form>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
