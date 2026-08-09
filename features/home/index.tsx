import Link from 'next/link';
import { client } from '@shared/utils/sanity';
import Hero from './Hero';
import Services from './Services';
import './style.scss';

const query = `
*[_type == "home"][0]{
  "hero": hero{
    title,
    subtitle,
    ctaLabel
  },
  "services": services{
    title,
    items
  }
}
`;

export const revalidate = 3600; // Cache 1 heure

// Valeurs par défaut si pas de contenu Sanity
const defaultData = {
	hero: {
		title: 'Je crée des sites internet qui expliquent||clairement votre activité.',
		subtitle:
			"Basé à Aurillac, dans le Cantal, je crée votre site internet et je m'occupe du design, du développement et de la mise en ligne.",
		ctaLabel: 'Parler de mon projet'
	},
	services: {
		title: "Tout ce qu'il faut pour avoir un site internet utile.",
		items: [
			{
				title: 'Un site clair et rapide',
				description:
					'Je transforme votre activité en un site simple à comprendre, agréable à parcourir et rapide sur téléphone comme sur ordinateur.'
			},
			{
				title: 'Vous gardez la main',
				description:
					'Vous pouvez modifier vos textes, vos images et vos actualités vous-même, sans devoir appeler un développeur à chaque changement.'
			},
			{
				title: 'Une expérience facile',
				description:
					'Chaque page est pensée pour guider vos visiteurs vers la bonne information et leur donner envie de vous contacter.'
			},
			{
				title: 'Je reste disponible',
				description:
					'Après la mise en ligne, je peux vous accompagner pour les mises à jour, les améliorations et les nouvelles idées.'
			}
		]
	}
};

const methode = [
	{
		step: 'On en parle',
		body: 'Un premier échange pour comprendre votre activité, vos besoins et votre budget.'
	},
	{
		step: 'On imagine',
		body: 'Je vous propose une structure et une direction visuelle avant de commencer.'
	},
	{
		step: 'Je construis',
		body: "Je crée le site, vous suivez l'avancement et vous validez chaque étape importante."
	},
	{
		step: 'On le lance',
		body: 'Votre site est mis en ligne, expliqué et prêt à évoluer avec votre activité.'
	}
];

const offres = [
	{
		name: 'Vitrine',
		price: 'à partir de 500 €',
		items: [
			'3 à 5 pages',
			'Design sur mesure',
			'SEO technique',
			'Mise en ligne incluse'
		]
	},
	{
		name: 'Boutique en ligne',
		price: 'à partir de 2 000 €',
		items: [
			'Boutique Shopify complète',
			'Paiements sécurisés',
			'Produits illimités',
			'Formation à la gestion'
		]
	},
	{
		name: 'Accompagnement',
		price: '150 € / mois',
		items: [
			'Mises à jour',
			'Sauvegardes',
			'Évolutions régulières',
			'Support prioritaire'
		]
	}
];

export default async function HomePage() {
	const data = await client.fetch(query);

	// Utilise les données Sanity si disponibles, sinon les valeurs par défaut
	const hero = data?.hero || defaultData.hero;
	const services = data?.services || defaultData.services;

	return (
		<>
			<Hero {...hero} />
			<Services {...services} />

			<section id="methode" className="band home-methode">
				<div className="container">
					<p className="eyebrow">Comment ça marche</p>
					<h2 className="home-methode__title">
						Un accompagnement simple, du premier échange à la mise
						en ligne.
					</h2>
					<ol className="home-methode__list">
						{methode.map((m, i) => (
							<li key={m.step} className="home-methode__item">
								<span className="home-methode__number">
									{String(i + 1).padStart(2, '0')}
								</span>
								<h3>{m.step}</h3>
								<p>{m.body}</p>
							</li>
						))}
					</ol>
				</div>
			</section>

			<section id="tarifs" className="band home-tarifs">
				<div className="container">
					<p className="eyebrow">Tarifs</p>
					<h2 className="home-tarifs__title">
						Des offres simples, adaptées à votre besoin.
					</h2>
					<div className="home-tarifs__grid">
						{offres.map((o) => (
							<div
								key={o.name}
								className={`home-tarifs__card${o.featured ? ' home-tarifs__card--featured' : ''}`}
							>
								<h3>{o.name}</h3>
								<p className="home-tarifs__price">{o.price}</p>
								<ul>
									{o.items.map((i) => (
										<li key={i}>
											<span aria-hidden="true">—</span>
											{i}
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
					<div className="home-tarifs__more">
						<Link href="/tarifs" className="button-secondary">
							Voir le détail des tarifs
						</Link>
					</div>
				</div>
			</section>

			<section id="contact" className="band home-contact">
				<div className="container home-contact__inner">
					<div>
						<p className="eyebrow">Contact</p>
						<h2 className="home-contact__title">
							Vous avez un projet ? Parlons-en.
						</h2>
						<p className="home-contact__text">
							Écrivez-moi quelques mots sur votre activité. Le
							premier échange est gratuit et sans engagement.
						</p>
					</div>
					<Link href="/contact" className="button-primary">
						Démarrer un projet <span aria-hidden="true">→</span>
					</Link>
				</div>
			</section>
		</>
	);
}
