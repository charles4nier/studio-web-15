'use client';

import { ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccessibleModal } from '@shared/hooks/useAccessibleModal';
import './style.scss';

interface AccessibleModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
	className?: string;
	ariaLabel: string;
}

export default function AccessibleModal({
	isOpen,
	onClose,
	children,
	className = '',
	ariaLabel
}: AccessibleModalProps) {
	const modalContentRef = useRef<HTMLDivElement>(null);
	useAccessibleModal({ isOpen, onClose, modalRef: modalContentRef });

	if (typeof window === 'undefined') return null;

	return createPortal(
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className={`accessible-modal ${className}`}
					role="dialog"
					aria-modal="true"
					aria-label={ariaLabel}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.4, ease: 'easeInOut' }}
					onClick={(e) => {
						// Fermer si clic sur le backdrop
						if (e.target === e.currentTarget) {
							onClose();
						}
					}}
				>
					<div className="accessible-modal__document" role="document" ref={modalContentRef}>
						{/* Contenu */}
						{children}
					</div>
				</motion.div>
			)}
		</AnimatePresence>,
		document.body
	);
}
