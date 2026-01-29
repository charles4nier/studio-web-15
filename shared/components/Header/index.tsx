'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
		{ name: 'Contact', path: '/contact' }
	];

	const isActive = (path: string) => pathname === path;

	const handleClose = () => {
		setIsClosing(true);
		setTimeout(() => {
			setIsOpen(false);
			setIsClosing(false);
		}, 300);
	};

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

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
					>
						<span></span>
						<span></span>
						<span></span>
					</button>
				</div>
			</div>

			<>
				<div
					className={`${CLASS_NAME}__overlay ${isOpen && !isClosing ? 'open' : ''} ${isClosing ? 'closing' : ''}`}
					onClick={handleClose}
					style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
				/>
				<nav className={`${CLASS_NAME}__mobile ${isOpen && !isClosing ? 'open' : ''} ${isClosing ? 'closing' : ''}`}>
					<ul>
						{navLinks.map((link, index) => (
							<li 
								key={link.path}
								style={{ transitionDelay: isOpen && !isClosing ? `${0.1 + index * 0.05}s` : '0s' }}
							>
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
			</>
		</header>
	);
}
