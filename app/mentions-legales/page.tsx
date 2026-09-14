import type { Metadata } from 'next';
import { generatePageMetadata } from '@shared/config/seo';
import './style.scss';

export const metadata: Metadata = generatePageMetadata({
	title: 'Mentions légales',
	description: 'Mentions légales de Studio Web 15.',
	path: '/mentions-legales'
});

export default function MentionsLegalesPage() {
	return (
		<main className="legal container">
			<h1>Mentions légales</h1>

			<h2>Éditeur du site</h2>
			<p>
				Studio Web15, entreprise individuelle (micro-entrepreneur).
				<br />
				2 chemin de Patay, 15000 Aurillac
				<br />
				SIRET : 752 532 234 — TVA non applicable, art. 293 B du CGI
				<br />
				Directeur de la publication : Charles Fournier
				<br />
				Contact : <a href="mailto:contact@studioweb15.fr">contact@studioweb15.fr</a> —{' '}
				<a href="tel:+33698483658">06 98 48 36 58</a>
			</p>

			<h2>Hébergement</h2>
			<p>
				Ce site est hébergé par Vercel Inc.
				<br />
				440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
				<br />
				<a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
					vercel.com
				</a>
			</p>

			<h2>Propriété intellectuelle</h2>
			<p>
				L&apos;ensemble des contenus présents sur ce site (textes, visuels, code) est la
				propriété de Studio Web15, sauf mention contraire, et ne peut être reproduit sans
				autorisation préalable.
			</p>

			<h2>Données personnelles</h2>
			<p>
				Ce site ne dépose aucun cookie et n&apos;utilise aucun outil de mesure
				d&apos;audience. La seule donnée personnelle traitée est celle que vous
				transmettez volontairement via le formulaire de contact (nom, e-mail, téléphone
				le cas échéant, et le contenu de votre message ou de votre demande de devis).
			</p>
			<p>
				Ces informations sont utilisées uniquement pour répondre à votre demande et, le
				cas échéant, établir un devis. Elles sont transmises par e-mail via Resend
				(prestataire d&apos;envoi d&apos;e-mails, basé aux États-Unis), et conservées le
				temps nécessaire au traitement de votre demande puis à la relation
				commerciale, sans être cédées à un tiers.
			</p>
			<p>
				Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
				rectification et d&apos;effacement de vos données : il vous suffit d&apos;en
				faire la demande à{' '}
				<a href="mailto:contact@studioweb15.fr">contact@studioweb15.fr</a>.
			</p>
		</main>
	);
}
