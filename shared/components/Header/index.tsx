'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import StudioModal from '@shared/components/StudioModal';
import { motion } from 'framer-motion';
import './style.scss';

const CLASS_NAME = 'header';

const navLinks = [
	{ name: 'Réalisations', path: '/realisations' },
	{ name: 'Tarifs', path: '/tarifs' }
];

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const pathname = usePathname();
	const prevPathnameRef = useRef(pathname);

	const isActive = (path: string) =>
		path === '/' ? pathname === '/' : pathname.startsWith(path);

	const handleClose = () => {
		setIsClosing(true);
		setTimeout(() => {
			setIsOpen(false);
			setIsClosing(false);
		}, 400);
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
						<Image
							src="/favicon.svg"
							alt=""
							width={24}
							height={24}
							className={`${CLASS_NAME}__logo-icon`}
						/>
						Studio Web <span className={`${CLASS_NAME}__logo-accent`}>15</span>
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

					<Link href="/contact" className={`${CLASS_NAME}__cta`}>
						Démarrer un projet
					</Link>

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
							<Image
							src="/favicon.svg"
							alt=""
							width={24}
							height={24}
							className={`${CLASS_NAME}__logo-icon`}
						/>
						Studio Web <span className={`${CLASS_NAME}__logo-accent`}>15</span>
						</Link>
					</div>
					<nav className={`${CLASS_NAME}__mobile-nav`}>
						<motion.ul
							initial="closed"
							animate={isOpen && !isClosing ? 'open' : 'closed'}
							variants={{
								open: {
									transition: {
										staggerChildren: 0.08,
										delayChildren: 0.1
									}
								},
								closed: {
									transition: {
										staggerChildren: 0.06,
										staggerDirection: -1
									}
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
							<motion.li
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
									href="/contact"
									className={`${CLASS_NAME}__mobile-link ${CLASS_NAME}__mobile-link--cta`}
								>
									Démarrer un projet
								</Link>
							</motion.li>
						</motion.ul>
					</nav>
				</div>
			</StudioModal>
		</header>
	);
}
