'use client';

import './style.scss';
import { motion } from 'framer-motion';

interface Service {
	title: string;
	description: string;
}

interface ServicesProps {
	title: string;
	items: Service[];
}

export default function Services({ title, items }: ServicesProps) {
	return (
		<motion.section
			id="expertises"
			className="band services"
			initial={{ opacity: 0, y: 40 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '-100px' }}
			transition={{ duration: 0.6, ease: 'easeOut' }}
		>
			<div className="container">
				<p className="eyebrow">Ce que je fais</p>
				<h2 className="services__title">{title}</h2>
				<div className="services__list">
					{items?.map((item, index) => (
						<motion.article
							key={index}
							className="services__item"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
						>
							<span className="services__item-number">
								{String(index + 1).padStart(2, '0')}
							</span>
							<div>
								<h3 className="services__item-title">
									{item.title}
								</h3>
								<p className="services__item-description">
									{item.description}
								</p>
							</div>
						</motion.article>
					))}
				</div>
			</div>
		</motion.section>
	);
}
