'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	useEffect(() => {
		// Enlever les anciennes classes de page
		document.body.classList.remove('page-home', 'page-tarifs', 'page-contact');

		// Ajouter la classe correspondante
		if (pathname === '/') {
			document.body.classList.add('page-home');
		} else if (pathname === '/tarifs') {
			document.body.classList.add('page-tarifs');
		} else if (pathname === '/contact') {
			document.body.classList.add('page-contact');
		}
	}, [pathname]);

	return <>{children}</>;
}
