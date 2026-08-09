import './style.scss';
import Link from 'next/link';
import { client } from '@shared/utils/sanity';
import RealisationsHero from './RealisationsHero';
import RealisationsGrid, { Project } from './RealisationsGrid';

const query = `
*[_type == "realisation"] | order(coalesce(year, "0") desc, _createdAt desc) {
  "_id": _id,
  "slug": slug.current,
  title,
  client,
  category,
  excerpt,
  coverImage,
  technologies,
  resultLine
}
`;

export const revalidate = 3600; // Cache 1 heure

export default async function Realisations() {
	const projects: Project[] = (await client.fetch(query)) || [];

	return (
		<div className="realisations">
			<RealisationsHero count={projects.length} />
			<RealisationsGrid projects={projects} />

			<section className="realisations-cta">
				<div className="container realisations-cta__inner">
					<div>
						<p className="realisations-cta__eyebrow">
							Votre projet
						</p>
						<h2 className="realisations-cta__title">
							Vous avez besoin d&apos;un site ? Écrivez-moi.
						</h2>
					</div>
					<Link href="/contact" className="button-primary">
						Décrire mon projet <span aria-hidden="true">→</span>
					</Link>
				</div>
			</section>
		</div>
	);
}
