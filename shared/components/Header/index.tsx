'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import StudioModal from '@shared/components/StudioModal';
import { motion } from 'framer-motion';
import './style.scss';

const CLASS_NAME = 'header';

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const pathname = usePathname();
	const prevPathnameRef = useRef(pathname);

	const navLinks = [
		{ name: 'Accueil', path: '/' },
		{ name: 'Tarifs', path: '/tarifs' },
		{ name: 'Votre partenaire local', path: '/partenaire-local' },
		{ name: 'Contact', path: '/contact' }
	];

	const isActive = (path: string) => pathname === path;

	const handleClose = () => {
		setIsClosing(true);
		setTimeout(() => {
			setIsOpen(false);
			setIsClosing(false);
		}, 400);
	};

	// Déterminer le gradient selon la page
	const getGradientId = (): 'home' | 'tarifs' | 'contact' | 'partenaire' => {
		if (pathname === '/tarifs') return 'tarifs';
		if (pathname === '/contact') return 'contact';
		if (pathname === '/partenaire-local') return 'partenaire';
		return 'home';
	};

	// Fermer le menu quand on change de page
	useEffect(() => {
		if (pathname !== prevPathnameRef.current && isOpen) {
			handleClose();
		}
		prevPathnameRef.current = pathname;
	}, [pathname, isOpen]);

	return (
		<header className={CLASS_NAME}>
			<div className="container">
				<div className={`${CLASS_NAME}__inner`}>
					<Link href="/" className={`${CLASS_NAME}__logo`}>
						Studio Web 15
					</Link>

					<nav className={`${CLASS_NAME}__nav`}>
						<ul>
							{navLinks.map((link) => (
								<li key={link.path}>
									<Link
										href={link.path}
										className={
											isActive(link.path)
												? `${CLASS_NAME}__link active`
												: `${CLASS_NAME}__link`
										}
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</nav>

				<button
					className={`${CLASS_NAME}__burger ${isOpen ? 'open' : ''}`}
					onClick={() => {
						if (isOpen) {
							handleClose();
						} else {
							setIsOpen(true);
						}
					}}
					aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
					aria-expanded={isOpen}
					aria-controls="mobile-nav"
				>
					<span></span>
					<span></span>
					<span></span>
				</button>
				</div>
			</div>

			{/* Menu mobile via StudioModal */}
			<StudioModal
				isOpen={isOpen}
				onClose={handleClose}
				ariaLabel="Menu de navigation"
				gradientId={getGradientId()}
				showCloseButton={false}
			>
				<div className={`${CLASS_NAME}__mobile-content`}>
					<div className={`${CLASS_NAME}__mobile-header`}>
						<button
							className={`${CLASS_NAME}__mobile-close`}
							onClick={handleClose}
							aria-label="Fermer le menu"
						>
							<span></span>
							<span></span>
						</button>
						<Link href="/" className={`${CLASS_NAME}__mobile-logo`}>
							Studio Web 15
						</Link>
					</div>
					<nav className={`${CLASS_NAME}__mobile-nav`}>
						<motion.ul
							initial="closed"
							animate={isOpen && !isClosing ? "open" : "closed"}
							variants={{
								open: {
									transition: { staggerChildren: 0.08, delayChildren: 0.1 }
								},
								closed: {
									transition: { staggerChildren: 0.06, staggerDirection: -1 }
								}
							}}
						>
							{navLinks.map((link) => (
								<motion.li
									key={link.path}
									variants={{
										open: { 
											opacity: 1, 
											y: 0,
											transition: { 
												duration: 0.4,
												ease: [0.25, 0.1, 0.25, 1]
											}
										},
										closed: { 
											opacity: 0, 
											y: 10,
											transition: {
												duration: 0.35,
												ease: [0.4, 0, 0.6, 1]
											}
										}
									}}
								>
									<Link
										href={link.path}
										className={
											isActive(link.path)
												? `${CLASS_NAME}__mobile-link active`
												: `${CLASS_NAME}__mobile-link`
										}
									>
										{link.name}
									</Link>
								</motion.li>
							))}
						</motion.ul>
					</nav>
				</div>
			</StudioModal>
		</header>
	);
}
