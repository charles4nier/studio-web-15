import './style.scss';
import Link from 'next/link';
import { client } from '@shared/utils/sanity';
import RealisationsHero from './RealisationsHero';
import RealisationsGrid, { Project } from './RealisationsGrid';

const query = `
*[_type == "realisation"] | order(coalesce(order, 999) asc, year desc) {
  "_id": _id,
  "slug": slug.current,
  title,
  client,
  category,
  excerpt,
  coverImage,
  technologies
}
`;

export const revalidate = 3600; // Cache 1 heure

export default async function Realisations() {
	const projects: Project[] = (await client.fetch(query)) || [];

	return (
		<div className="realisations">
			<RealisationsHero />
			<RealisationsGrid projects={projects} />

			<section className="cta-section">
				<div className="container">
					<h2 className="cta-section__title">Un projet en tête ?</h2>
					<p className="cta-section__subtitle">
						Discutons de vos besoins et trouvons la solution idéale
						ensemble.
					</p>
					<Link href="/contact" className="button-primary">
						Demander un devis gratuit
					</Link>
				</div>
			</section>
		</div>
	);
}
