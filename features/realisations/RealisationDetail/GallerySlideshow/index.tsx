'use client';

import './style.scss';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SanityImage from '@shared/components/SanityImage';
import { SanityImage as SanityImageType } from '@types/sanity';

interface GallerySlideshowProps {
	images: SanityImageType[];
	title: string;
}

const slideVariants = {
	enter: (direction: number) => ({
		x: direction > 0 ? 60 : -60,
		opacity: 0
	}),
	center: {
		x: 0,
		opacity: 1
	},
	exit: (direction: number) => ({
		x: direction > 0 ? -60 : 60,
		opacity: 0
	})
};

export default function GallerySlideshow({
	images,
	title
}: GallerySlideshowProps) {
	const [[index, direction], setIndex] = useState([0, 0]);

	if (images.length === 0) return null;

	const go = (newDirection: number) => {
		setIndex(([current]) => {
			const next =
				(current + newDirection + images.length) % images.length;
			return [next, newDirection];
		});
	};

	const goTo = (target: number) => {
		setIndex(([current]) => [target, target > current ? 1 : -1]);
	};

	const image = images[index];

	return (
		<div className="gallery-slideshow">
			<div className="gallery-slideshow__viewport">
				<AnimatePresence initial={false} custom={direction} mode="wait">
					<motion.div
						key={index}
						custom={direction}
						variants={slideVariants}
						initial="enter"
						animate="center"
						exit="exit"
						transition={{
							duration: 0.4,
							ease: [0.25, 0.1, 0.25, 1]
						}}
						className="gallery-slideshow__slide"
					>
						<SanityImage
							image={image}
							alt={image?.alt || `${title} — image ${index + 1}`}
							width={1400}
							height={950}
							className="gallery-slideshow__image"
							sizes="(max-width: 1024px) 100vw, 900px"
						/>
					</motion.div>
				</AnimatePresence>

				{images.length > 1 && (
					<>
						<button
							type="button"
							className="gallery-slideshow__arrow gallery-slideshow__arrow--prev"
							onClick={() => go(-1)}
							aria-label="Image précédente"
						>
							←
						</button>
						<button
							type="button"
							className="gallery-slideshow__arrow gallery-slideshow__arrow--next"
							onClick={() => go(1)}
							aria-label="Image suivante"
						>
							→
						</button>
					</>
				)}
			</div>

			{images.length > 1 && (
				<div className="gallery-slideshow__dots">
					{images.map((_, i) => (
						<button
							key={i}
							type="button"
							className={`gallery-slideshow__dot ${i === index ? 'is-active' : ''}`}
							onClick={() => goTo(i)}
							aria-label={`Aller à l'image ${i + 1}`}
						/>
					))}
				</div>
			)}
		</div>
	);
}
