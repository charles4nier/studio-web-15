import Image from 'next/image';
import { urlForImg } from '@shared/utils/sanity';

import { SanityImageProps } from './type';

export default function SanityImage({
	image,
	alt = '',
	width = 800,
	height = 600,
	className,
	quality = 80,
	sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 768px',
	priority = false,
	placeholder = 'blur',
	blurDataURL
}: SanityImageProps) {
	if (!image) return null;

	const src = urlForImg(image).width(width).height(height).format('webp').quality(quality).url();

	return (
		<Image
			src={src}
			alt={alt}
			width={width}
			height={height}
			className={className}
			sizes={sizes}
			loading={priority ? 'eager' : 'lazy'}
			priority={priority}
			fetchPriority={priority ? 'high' : 'auto'}
			placeholder={blurDataURL ? placeholder : 'empty'}
			blurDataURL={blurDataURL}
		/>
	);
}
