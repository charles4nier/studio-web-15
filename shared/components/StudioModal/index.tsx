'use client';

import { ReactNode, useEffect, useState, useRef } from 'react';
import AccessibleModal from '@shared/components/AccessibleModal';
import { motion, AnimatePresence } from 'framer-motion';
import './style.scss';

interface StudioModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
	ariaLabel: string;
	gradientId?: 'home' | 'tarifs' | 'contact' | 'agence';
	showCloseButton?: boolean;
}

export default function StudioModal({
	isOpen,
	onClose,
	children,
	ariaLabel,
	gradientId = 'home',
	showCloseButton = true
}: StudioModalProps) {
	const contentRef = useRef<HTMLDivElement>(null);
	const [showScrollIndicator, setShowScrollIndicator] = useState(false);

	useEffect(() => {
		if (!isOpen || !contentRef.current) return;

		const checkScroll = () => {
			if (!contentRef.current) return;
			const { scrollHeight, clientHeight, scrollTop } = contentRef.current;
			const isScrollable = scrollHeight > clientHeight;
			const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
			
			setShowScrollIndicator(isScrollable && !isAtBottom);
		};

		checkScroll();

		const resizeObserver = new ResizeObserver(checkScroll);
		resizeObserver.observe(contentRef.current);

		contentRef.current.addEventListener('scroll', checkScroll);
		const currentRef = contentRef.current;

		return () => {
			resizeObserver.disconnect();
			currentRef?.removeEventListener('scroll', checkScroll);
		};
	}, [isOpen]);

	return (
		<AccessibleModal isOpen={isOpen} onClose={onClose} ariaLabel={ariaLabel} className="studio-modal">
			{/* Fils de soie animés */}
			<svg className="studio-modal__waves" viewBox="0 0 1200 1000" preserveAspectRatio="none">
				<defs>
					<linearGradient id="modal-gradient-home" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#0066ff">
							<animate attributeName="offset" values="0;1;0" dur="25s" repeatCount="indefinite" />
						</stop>
						<stop offset="50%" stopColor="#ec4899">
							<animate attributeName="offset" values="0.5;1.5;0.5" dur="25s" repeatCount="indefinite" />
						</stop>
						<stop offset="100%" stopColor="#0066ff">
							<animate attributeName="offset" values="1;2;1" dur="25s" repeatCount="indefinite" />
						</stop>
					</linearGradient>
					<linearGradient id="modal-gradient-tarifs" x1="0%" y1="0%" x2="100%" y2="100%">
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
					<linearGradient id="modal-gradient-contact" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#10b981">
							<animate attributeName="offset" values="0;1;0" dur="25s" repeatCount="indefinite" />
						</stop>
						<stop offset="50%" stopColor="#0066ff">
							<animate attributeName="offset" values="0.5;1.5;0.5" dur="25s" repeatCount="indefinite" />
						</stop>
						<stop offset="100%" stopColor="#10b981">
							<animate attributeName="offset" values="1;2;1" dur="25s" repeatCount="indefinite" />
						</stop>
					</linearGradient>
					<linearGradient id="modal-gradient-partenaire" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#f59e0b">
							<animate attributeName="offset" values="0;1;0" dur="25s" repeatCount="indefinite" />
						</stop>
						<stop offset="50%" stopColor="#00e5ff">
							<animate attributeName="offset" values="0.5;1.5;0.5" dur="25s" repeatCount="indefinite" />
						</stop>
						<stop offset="100%" stopColor="#f59e0b">
							<animate attributeName="offset" values="1;2;1" dur="25s" repeatCount="indefinite" />
						</stop>
					</linearGradient>
				</defs>
				{/* Ligne principale - centre */}
				<path 
					fill="none" 
					stroke={`url(#modal-gradient-${gradientId})`}
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
				{/* Ligne 2 - bas gauche */}
				<path 
					fill="none" 
					stroke={`url(#modal-gradient-${gradientId})`}
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
				{/* Ligne 3 - haut droite */}
				<path 
					fill="none" 
					stroke={`url(#modal-gradient-${gradientId})`}
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

			{/* Bouton fermer (optionnel) */}
			{showCloseButton && (
				<button
					className="studio-modal__close"
					onClick={onClose}
					aria-label="Fermer la fenêtre"
				>
					<span></span>
					<span></span>
				</button>
			)}

			{/* Contenu */}
			<div className="studio-modal__content" ref={contentRef}>
				{children}
			</div>

			{/* Indicateur de scroll */}
			<AnimatePresence>
				{showScrollIndicator && (
					<motion.button
						className="studio-modal__scroll-indicator"
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.3 }}
						onClick={() => {
							contentRef.current?.scrollTo({
								top: contentRef.current.scrollHeight,
								behavior: 'smooth'
							});
						}}
						aria-label="Défiler vers le bas"
					>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
							<path
								d="M12 5L12 19M12 19L19 12M12 19L5 12"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</motion.button>
				)}
			</AnimatePresence>
		</AccessibleModal>
	);
}
