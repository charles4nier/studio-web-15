export type SanityImageProps = {
	image: any;
	alt?: string;
	width?: number;
	height?: number;
	className?: string;
	quality?: number;
	sizes?: string;
	priority?: boolean;
	placeholder?: 'blur' | 'empty';
	blurDataURL?: string;
};
