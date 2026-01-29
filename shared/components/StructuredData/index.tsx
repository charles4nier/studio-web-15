import { siteConfig } from '@shared/config/seo';

interface StructuredDataProps {
	type: 'Organization' | 'WebSite' | 'WebPage';
	data?: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
	const getStructuredData = () => {
		const baseUrl = siteConfig.url;

		switch (type) {
			case 'Organization':
				return {
					'@context': 'https://schema.org',
					'@type': 'Organization',
					name: siteConfig.name,
					url: baseUrl,
					logo: `${baseUrl}/logo.png`,
					description: siteConfig.description,
					sameAs: [],
					contactPoint: {
						'@type': 'ContactPoint',
						contactType: 'Customer Service',
						areaServed: 'FR',
						availableLanguage: 'French'
					}
				};

			case 'WebSite':
				return {
					'@context': 'https://schema.org',
					'@type': 'WebSite',
					name: siteConfig.name,
					url: baseUrl,
					description: siteConfig.description
				};

			case 'WebPage':
				if (!data) return null;
				return {
					'@context': 'https://schema.org',
					'@type': 'WebPage',
					name: data.name,
					description: data.description,
					url: data.url || baseUrl
				};

			default:
				return null;
		}
	};

	const structuredData = getStructuredData();

	if (!structuredData) return null;

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
		/>
	);
}
