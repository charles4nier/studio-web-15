import { siteConfig } from '@shared/config/seo';

interface StructuredDataProps {
	type: 'Organization' | 'WebSite' | 'WebPage' | 'LocalBusiness';
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

			case 'LocalBusiness':
				return {
					'@context': 'https://schema.org',
					'@type': 'LocalBusiness',
					'@id': `${baseUrl}#localbusiness`,
					name: siteConfig.name,
					image: `${baseUrl}/logo.png`,
					url: baseUrl,
					telephone: data?.telephone || '',
					email: 'contact@studioweb15.fr',
					address: {
						'@type': 'PostalAddress',
						addressLocality: siteConfig.location.city,
						addressRegion: siteConfig.location.region,
						addressCountry: 'FR'
					},
					geo: {
						'@type': 'GeoCoordinates',
						latitude: data?.latitude || 45.03,
						longitude: data?.longitude || 2.44
					},
					areaServed: siteConfig.location.departments.map((dept) => ({
						'@type': 'City',
						name: dept
					})),
					priceRange: '1500€ - 5000€',
					description: siteConfig.description,
					openingHoursSpecification: [
						{
							'@type': 'OpeningHoursSpecification',
							dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
							opens: '09:00',
							closes: '18:00'
						}
					],
					sameAs: []
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
