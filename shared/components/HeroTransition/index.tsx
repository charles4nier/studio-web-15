'use client';

import { useEffect, useRef } from 'react';

export default function HeroTransition() {
	const prevHeightRef = useRef<number | null>(null);

	useEffect(() => {
		// Observer pour détecter les changements de hero
		const observer = new MutationObserver(() => {
			const hero =
				document.querySelector('.hero') ||
				document.querySelector('.tarifs-hero') ||
				document.querySelector('.contact-hero');

			if (hero) {
				const currentHeight = hero.scrollHeight;

				// Si on a une hauteur précédente, on l'applique d'abord
				if (prevHeightRef.current !== null && prevHeightRef.current !== currentHeight) {
					// Force la hauteur précédente momentanément
					(hero as HTMLElement).style.minHeight = `${prevHeightRef.current}px`;

					// Puis on laisse la transition CSS faire son travail
					requestAnimationFrame(() => {
						(hero as HTMLElement).style.minHeight = '';
					});
				}

				// Sauvegarde la nouvelle hauteur
				prevHeightRef.current = currentHeight;
			}
		});

		// Observer le body pour les changements
		observer.observe(document.body, {
			childList: true,
			subtree: true
		});

		return () => observer.disconnect();
	}, []);

	return null;
}
