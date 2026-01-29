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
					className={`${CLASS_NAME}__burger ${isOpen && !isClosing ? 'open' : ''}`}
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

		<nav className={`${CLASS_NAME}__mobile ${isOpen && !isClosing ? 'open' : ''} ${isClosing ? 'closing' : ''}`}>
			<svg className={`${CLASS_NAME}__mobile-wave`} viewBox="0 0 1200 1000" preserveAspectRatio="none">
				<defs>
					<linearGradient id="wave-gradient-home" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#0066ff">
							<animate attributeName="offset" values="0;1;0" dur="25s" repeatCount="indefinite" />
						</stop>
						<stop offset="33%" stopColor="#7c3aed">
							<animate attributeName="offset" values="0.33;1.33;0.33" dur="25s" repeatCount="indefinite" />
						</stop>
						<stop offset="66%" stopColor="#ec4899">
							<animate attributeName="offset" values="0.66;1.66;0.66" dur="25s" repeatCount="indefinite" />
						</stop>
						<stop offset="100%" stopColor="#0066ff">
							<animate attributeName="offset" values="1;2;1" dur="25s" repeatCount="indefinite" />
						</stop>
					</linearGradient>
					<linearGradient id="wave-gradient-tarifs" x1="0%" y1="0%" x2="100%" y2="100%">
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
					<linearGradient id="wave-gradient-contact" x1="0%" y1="0%" x2="100%" y2="100%">
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
				</defs>
			{/* Ligne principale - centre */}
			<path 
				fill="none" 
				stroke="url(#wave-gradient-home)" 
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
				stroke="url(#wave-gradient-home)" 
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
				stroke="url(#wave-gradient-home)" 
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
			<div className={`${CLASS_NAME}__mobile-header`}>
				<Link href="/" className={`${CLASS_NAME}__mobile-logo`}>
					Studio Web 15
				</Link>
			</div>
			<div className={`${CLASS_NAME}__mobile-content`}>
				<ul>
					{navLinks.map((link, index) => (
						<li 
							key={link.path}
							style={{ transitionDelay: isOpen && !isClosing ? `${0.15 + index * 0.1}s` : '0s' }}
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
			</div>
		</nav>
		</header>
	);
}
