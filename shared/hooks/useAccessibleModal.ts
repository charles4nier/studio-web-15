import { useEffect, useRef, RefObject } from 'react';

interface UseAccessibleModalProps {
	isOpen: boolean;
	onClose: () => void;
	modalRef: RefObject<HTMLDivElement>;
}

export function useAccessibleModal({ isOpen, onClose, modalRef }: UseAccessibleModalProps) {
	const previousActiveElementRef = useRef<HTMLElement | null>(null);

	// Gestion focus et aria-hidden
	useEffect(() => {
		if (isOpen) {
			// Sauvegarder l'élément actuellement focus (bouton d'ouverture)
			previousActiveElementRef.current = document.activeElement as HTMLElement;

			// Cacher le reste du contenu pour les screen readers
			const mainContent = document.getElementById('main-content');
			if (mainContent) {
				mainContent.setAttribute('aria-hidden', 'true');
			}

			// Focus sur le premier élément focusable après l'animation
			setTimeout(() => {
				if (modalRef.current) {
					const firstFocusable = modalRef.current.querySelector<HTMLElement>(
						'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
					);
					firstFocusable?.focus();
				}
			}, 100);

			// Bloquer le scroll du body et compenser le scrollbar
			const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
			document.body.style.overflow = 'hidden';
			document.body.style.paddingRight = `${scrollbarWidth}px`;
		} else {
			// Réactiver le contenu pour les screen readers
			const mainContent = document.getElementById('main-content');
			if (mainContent) {
				mainContent.removeAttribute('aria-hidden');
			}

			// Restaurer le focus sur l'élément d'origine
			if (previousActiveElementRef.current) {
				previousActiveElementRef.current.focus();
			}

			// Réactiver le scroll
			document.body.style.overflow = '';
			document.body.style.paddingRight = '';
		}

		return () => {
			document.body.style.overflow = '';
			document.body.style.paddingRight = '';
		};
	}, [isOpen]);

	// Gestion du focus trap + Escape
	useEffect(() => {
		if (!isOpen || !modalRef.current) return;

		const handleTab = (e: KeyboardEvent) => {
			if (e.key !== 'Tab' || !modalRef.current) return;

			const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			);

			const firstFocusable = focusableElements[0];
			const lastFocusable = focusableElements[focusableElements.length - 1];

			if (e.shiftKey) {
				// Shift + Tab
				if (document.activeElement === firstFocusable) {
					e.preventDefault();
					lastFocusable?.focus();
				}
			} else {
				// Tab
				if (document.activeElement === lastFocusable) {
					e.preventDefault();
					firstFocusable?.focus();
				}
			}
		};

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleTab);
		document.addEventListener('keydown', handleEscape);

		return () => {
			document.removeEventListener('keydown', handleTab);
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isOpen, onClose, modalRef]);
}
