export interface SanityImage {
	_type: 'image';
	asset: {
		_ref: string;
		_type: 'reference';
	};
	alt?: string;
	hotspot?: {
		x: number;
		y: number;
		height: number;
		width: number;
	};
}

export interface SEO {
	metaTitle?: string;
	metaDescription?: string;
	openGraphImage?: SanityImage;
}
