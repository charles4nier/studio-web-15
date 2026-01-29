'use client';

import Link from 'next/link';
import './style.scss';

const CLASS_NAME = 'footer';

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className={CLASS_NAME}>
			<div className="container">
				<div className={`${CLASS_NAME}__top`}>
					<div className={`${CLASS_NAME}__col`}>
						<h3>Studio Web 15</h3>
						<p>Agence de développement web spécialisée en solutions digitales sur mesure.</p>
					</div>

					<div className={`${CLASS_NAME}__col`}>
						<h4>Navigation</h4>
						<ul>
							<li>
								<Link href="/">Accueil</Link>
							</li>
							<li>
								<Link href="/tarifs">Tarifs</Link>
							</li>
							<li>
								<Link href="/contact">Contact</Link>
							</li>
						</ul>
					</div>

					<div className={`${CLASS_NAME}__col ${CLASS_NAME}__col--contact`}>
						<h4>Contact</h4>
						<ul>
							<li>📧 contact@studioweb15.fr</li>
							<li>📍 Paris, France</li>
						</ul>
					</div>
				</div>

				<div className={`${CLASS_NAME}__bottom`}>
					<p>© {currentYear} Studio Web 15. Tous droits réservés.</p>
				</div>
			</div>
		</footer>
	);
}
