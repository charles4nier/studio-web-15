import { client } from '@shared/utils/sanity';
import Hero from './Hero';
import Services from './Services';

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
		title: 'Studio Web 15 - Agence digitale',
		subtitle:
			'Nous créons des expériences web sur mesure, performantes et esthétiques. Spécialistes Next.js, React et solutions digitales modernes.',
		ctaLabel: 'Discutons de votre projet'
	},
	services: {
		title: 'Nos expertises',
		items: [
			{
				title: 'Développement web sur mesure',
				description:
					'Sites web et applications Next.js performantes, optimisées SEO et parfaitement responsive. Architecture moderne et code de qualité.'
			},
			{
				title: 'Intégration CMS Headless',
				description:
					'Mise en place de Sanity CMS pour une gestion de contenu simple et puissante. Votre équipe peut modifier le site sans développeur.'
			},
			{
				title: 'Design & UX',
				description:
					'Interfaces modernes et intuitives. Design system cohérent, animations fluides et expérience utilisateur optimale.'
			},
			{
				title: 'Maintenance & évolution',
				description:
					'Support technique, mises à jour et évolutions de vos projets web. Disponibilité et réactivité garanties.'
			}
		]
	}
};

export default async function HomePage() {
	const data = await client.fetch(query);

	// Utilise les données Sanity si disponibles, sinon les valeurs par défaut
	const hero = data?.hero || defaultData.hero;
	const services = data?.services || defaultData.services;

	return (
		<>
			<Hero {...hero} />
			<Services {...services} />
		</>
	);
}
