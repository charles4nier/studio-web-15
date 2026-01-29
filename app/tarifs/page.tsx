'use client';

import { Metadata } from 'next';
import StructuredData from '@shared/components/StructuredData';
import Tarifs from '@features/tarifs';

export default function TarifsPage() {
	return (
		<>
			<StructuredData
				type="WebPage"
				data={{
					name: 'Tarifs - Studio Web 15',
					description:
						'Tarifs création sites web Next.js et e-commerce Shopify. Technologie moderne, performance optimale.'
				}}
			/>
			<Tarifs />
		</>
	);
}
