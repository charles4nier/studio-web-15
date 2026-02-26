'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTACT_EMAIL } from '@shared/config/contact';
import './style.scss';

const PHONE_DISPLAY = '06 98 48 36 58';
const PHONE_TEL = '+33698483658';

const easeFloat = [0.25, 0.46, 0.45, 0.94] as const;
const tCell = { duration: 0.45, ease: easeFloat };
const tCellExit = { delay: 0.2, duration: 0.38, ease: easeFloat };
const tPill = { duration: 0.4, ease: easeFloat };
const tContent = { duration: 0.3, ease: easeFloat, delay: 0.32 };
const tContentExit = { duration: 0.18, ease: easeFloat };
const staggerDelay = 0.07;

const PHONE_PATH = 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z';
const CROSS_PATH = 'M 6 6 L 18 18 M 18 6 L 6 18';

// Pastille au-dessus du cercle quand ouvert (bord bas du cercle = 200px)
const PILL_OFFSET_OPEN = 144;

type GradientId = 'home' | 'tarifs' | 'contact' | 'partenaire';

function getGradientId(pathname: string): GradientId {
	if (pathname === '/tarifs') return 'tarifs';
	if (pathname === '/contact') return 'contact';
	if (pathname === '/partenaire-local') return 'partenaire';
	return 'home';
}

export default function FloatingContact() {
	const pathname = usePathname();
	const gradientId = getGradientId(pathname);
	const [isOpen, setIsOpen] = useState(false);
	const [copiedField, setCopiedField] = useState<'phone' | 'email' | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const copyToClipboard = useCallback(async (text: string, field: 'phone' | 'email') => {
		try {
			await navigator.clipboard.writeText(text);
			setCopiedField(field);
			setTimeout(() => setCopiedField(null), 2000);
		} catch {
			// fallback
		}
	}, []);

	useEffect(() => {
		if (!isOpen) return;
		const handleClickOutside = (e: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	}, [isOpen]);

	const toggle = () => setIsOpen((o) => !o);

	return (
		<div className={`floating-contact${isOpen ? ' floating-contact--open' : ''}`} ref={containerRef}>
			{/* Cellule noire en cercle : se forme au clic */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="floating-contact__cell"
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0, transition: tCellExit }}
						transition={tCell}
						style={{ transformOrigin: '50% 100%' }}
					>
						{/* Filament (fil) façon popin - rappel du thème */}
						<svg className="floating-contact__waves" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" aria-hidden>
							<defs>
								<linearGradient id="float-grad-home" x1="0%" y1="0%" x2="100%" y2="100%">
									<stop offset="0%" stopColor="#0066ff" />
									<stop offset="50%" stopColor="#7c3aed" />
									<stop offset="100%" stopColor="#ec4899" />
								</linearGradient>
								<linearGradient id="float-grad-tarifs" x1="0%" y1="0%" x2="100%" y2="100%">
									<stop offset="0%" stopColor="#ec4899" />
									<stop offset="100%" stopColor="#f59e0b" />
								</linearGradient>
								<linearGradient id="float-grad-contact" x1="0%" y1="0%" x2="100%" y2="100%">
									<stop offset="0%" stopColor="#10b981" />
									<stop offset="100%" stopColor="#0066ff" />
								</linearGradient>
								<linearGradient id="float-grad-partenaire" x1="0%" y1="0%" x2="100%" y2="100%">
									<stop offset="0%" stopColor="#f59e0b" />
									<stop offset="100%" stopColor="#00e5ff" />
								</linearGradient>
							</defs>
							{/* Fil secondaire */}
							<path
								fill="none"
								stroke={`url(#float-grad-${gradientId})`}
								strokeWidth="1.4"
								opacity="0.2"
							>
								<animate
									attributeName="d"
									dur="28s"
									repeatCount="indefinite"
									values="M 150 30 Q 100 80, 50 120 T 20 180; M 150 30 Q 110 100, 50 100 T 20 160; M 150 30 Q 90 60, 50 140 T 20 180; M 150 30 Q 100 80, 50 120 T 20 180"
								/>
							</path>
							{/* Fil tertiaire */}
							<path
								fill="none"
								stroke={`url(#float-grad-${gradientId})`}
								strokeWidth="1"
								opacity="0.1"
							>
								<animate
									attributeName="d"
									dur="25s"
									repeatCount="indefinite"
									values="M 100 180 Q 60 120, 30 80 T 50 30; M 100 180 Q 80 140, 30 100 T 60 30; M 100 180 Q 50 100, 30 60 T 50 30; M 100 180 Q 60 120, 30 80 T 50 30"
								/>
							</path>
						</svg>

						<motion.div
							className="floating-contact__content"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0, transition: tContentExit }}
							transition={tContent}
						>
							<motion.button
								type="button"
								className="floating-contact__line"
								onClick={(e) => {
									e.stopPropagation();
									copyToClipboard(PHONE_TEL, 'phone');
								}}
								title="Copier le numéro"
								initial={{ opacity: 0, y: 5 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ ...tContent, delay: 0.32 }}
							>
								<span className="floating-contact__line-text">{PHONE_DISPLAY}</span>
								{copiedField === 'phone' && <span className="floating-contact__copied">Copié !</span>}
							</motion.button>
							<motion.button
								type="button"
								className="floating-contact__line"
								onClick={(e) => {
									e.stopPropagation();
									copyToClipboard(CONTACT_EMAIL, 'email');
								}}
								title="Copier l’email"
								initial={{ opacity: 0, y: 5 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ ...tContent, delay: 0.32 + staggerDelay }}
							>
								<span className="floating-contact__line-text">{CONTACT_EMAIL}</span>
								{copiedField === 'email' && <span className="floating-contact__copied">Copié !</span>}
							</motion.button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Une seule pastille : en bas à droite (fermé) ou au-dessus du cercle (ouvert) */}
			<motion.button
				type="button"
				className="floating-contact__pill"
				onClick={toggle}
				aria-expanded={isOpen}
				aria-label={isOpen ? 'Fermer' : 'Afficher téléphone et email'}
				animate={{
					bottom: isOpen ? PILL_OFFSET_OPEN : 0
				}}
				transition={tPill}
			>
				<svg
					className="floating-contact__icon-svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					aria-hidden
				>
					{isOpen ? (
						<path d={CROSS_PATH} />
					) : (
						<path d={PHONE_PATH} />
					)}
				</svg>
			</motion.button>
		</div>
	);
}
