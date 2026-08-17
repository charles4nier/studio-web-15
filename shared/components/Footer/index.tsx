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
						<h3>
							Studio Web <span className={`${CLASS_NAME}__brand-accent`}>15</span>
						</h3>
						<p>
							Création de sites internet à Aurillac, dans le
							Cantal et le Massif Central.
						</p>
					</div>

					<div className={`${CLASS_NAME}__col`}>
						<h4>Navigation</h4>
						<ul>
							<li>
								<Link href="/">Accueil</Link>
							</li>
							<li>
								<Link href="/realisations">Réalisations</Link>
							</li>
							<li>
								<Link href="/tarifs">Tarifs</Link>
							</li>
							<li>
								<Link href="/blog">Blog</Link>
							</li>
							<li>
								<Link href="/contact">Contact</Link>
							</li>
						</ul>
					</div>

					<div
						className={`${CLASS_NAME}__col ${CLASS_NAME}__col--contact`}
					>
						<h4>Contact</h4>
						<ul>
							<li>contact@studioweb15.fr</li>
							<li>
								<a href="tel:+33698483658">06 98 48 36 58</a>
							</li>
							<li>Aurillac, Cantal</li>
							<li>Intervention : Cantal, Aveyron, Creuse</li>
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
