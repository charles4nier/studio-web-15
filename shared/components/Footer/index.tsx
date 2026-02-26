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
						<p>Création de sites web dans le Cantal. Next.js et Shopify pour entreprises du Massif Central.</p>
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
								<Link href="/partenaire-local">Votre partenaire local</Link>
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
							<li>
								<a href="tel:+33698483658">📞 06 98 48 36 58</a>
							</li>
							<li>📍 Cantal, Auvergne</li>
							<li>📍 Intervention : Cantal, Aveyron, Creuse</li>
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
