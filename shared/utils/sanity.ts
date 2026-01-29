/**
 * Point d'entrée principal pour Sanity
 * Réexporte le client et fournit le builder d'images
 * Responsabilité : Point d'entrée unique pour les utilitaires Sanity
 */
import { client } from './sanity.client';
import imageUrlBuilder from '@sanity/image-url';

// Réexport du client (source unique de vérité)
export { client };

// Builder d'images
const builder = imageUrlBuilder(client);

export const urlForImg = (source: any) => builder.image(source);

/**
 * Génère une URL blur placeholder pour une image Sanity
 * Utilisé pour le placeholder blur de Next.js Image
 */
export const getBlurDataURL = (image: any, width: number = 20): string => {
	if (!image) return '';
	return urlForImg(image)
		.width(width)
		.height(Math.round((width * 9) / 16))
		.blur(50)
		.quality(20)
		.url();
};
