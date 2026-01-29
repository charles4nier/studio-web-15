'use client';

import { motion } from 'framer-motion';
import './style.scss';

interface OptionCardProps {
	icon: string;
	title: string;
	description: string;
	isSelected: boolean;
	onClick: () => void;
	recommended?: boolean;
}

export default function OptionCard({
	icon,
	title,
	description,
	isSelected,
	onClick,
	recommended = false
}: OptionCardProps) {
	return (
		<motion.div
			className={`option-card ${isSelected ? 'option-card--selected' : ''} ${recommended ? 'option-card--recommended' : ''}`}
			onClick={onClick}
			whileHover={{ scale: 1.05, y: -5 }}
			whileTap={{ scale: 0.98 }}
			transition={{ duration: 0.2 }}
		>
			{recommended && <div className="option-card__badge">Recommandé</div>}
			<div className="option-card__icon">{icon}</div>
			<h3 className="option-card__title">{title}</h3>
			<p className="option-card__description">{description}</p>
			{isSelected && (
				<motion.div
					className="option-card__check"
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ duration: 0.2 }}
				>
					✓
				</motion.div>
			)}
		</motion.div>
	);
}
