// Configuration SEO centralisée
export const siteConfig = {
	name: 'Studio Web 15',
	description:
		'Agence web dans le Cantal. Sites vitrines Next.js dès 1500€, e-commerce Shopify dès 2000€. Intervention Cantal, Aveyron, Creuse. Proximité, réactivité, technologie moderne.',
	url: process.env.NEXT_PUBLIC_SITE_URL || 'https://studioweb15.fr',
	ogImage: '/og-image.jpg',
	twitter: {
		handle: '@studioweb15',
		site: '@studioweb15'
	},
	location: {
		region: 'Auvergne-Rhône-Alpes',
		departments: ['Cantal', 'Aveyron', 'Creuse', 'Corrèze', 'Puy-de-Dôme', 'Haute-Loire', 'Lozère'],
		city: 'Aurillac'
	},
	keywords: [
		// Local primaire
		'agence web Cantal',
		'création site web Aurillac',
		'développeur web Cantal',
		'site internet Aurillac',
		'agence digitale Aveyron',
		'création site Rodez',
		'développeur Creuse',
		// Local + Tech
		'site Next.js Cantal',
		'boutique Shopify Aurillac',
		'e-commerce Aveyron',
		'site vitrine Cantal',
		'refonte site web Aurillac',
		// Tech + Perf
		'site rapide performant',
		'hébergement gratuit Vercel',
		'Sanity CMS',
		// Général
		'agence web Auvergne',
		'développeur freelance Massif Central',
		'création site TPE PME'
	]
};

// Métadonnées par défaut
export const defaultMetadata = {
	metadataBase: new URL(siteConfig.url),
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`
	},
	description: siteConfig.description,
	keywords: siteConfig.keywords,
	authors: [{ name: siteConfig.name }],
	creator: siteConfig.name,
	publisher: siteConfig.name,
	formatDetection: {
		email: false,
		address: false,
		telephone: false
	},
	alternates: {
		canonical: '/'
	},
	openGraph: {
		type: 'website',
		locale: 'fr_FR',
		url: siteConfig.url,
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.name,
		images: [
			{
				url: siteConfig.ogImage,
				width: 1200,
				height: 630,
				alt: siteConfig.name
			}
		]
	},
	twitter: {
		card: 'summary_large_image',
		title: siteConfig.name,
		description: siteConfig.description,
		creator: siteConfig.twitter.handle,
		site: siteConfig.twitter.site,
		images: [siteConfig.ogImage]
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large' as const,
			'max-snippet': -1
		}
	},
	verification: {
		google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
		yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
		yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION
	}
};

// Helper pour générer les métadonnées de page
export function generatePageMetadata({
	title,
	description,
	path = '',
	image,
	noindex = false
}: {
	title: string;
	description: string;
	path?: string;
	image?: string;
	noindex?: boolean;
}) {
	const fullTitle = `${title} | ${siteConfig.name}`;
	const url = `${siteConfig.url}${path}`;
	const ogImage = image || siteConfig.ogImage;

	return {
		title: fullTitle,
		description,
		alternates: {
			canonical: url
		},
		openGraph: {
			title: fullTitle,
			description,
			url,
			images: [
				{
					url: ogImage,
					width: 1200,
					height: 630,
					alt: title
				}
			]
		},
		twitter: {
			title: fullTitle,
			description,
			images: [ogImage]
		},
		robots: {
			index: !noindex,
			follow: !noindex
		}
	};
}
