import './style.scss';

interface PricingCardProps {
	name: string;
	price: string;
	description: string;
	features: string[];
	recommended?: boolean;
	unit?: string;
	clientCost?: string;
	onSelect?: () => void;
}

export default function PricingCard({
	name,
	price,
	description,
	features,
	recommended = false,
	unit = '€',
	clientCost,
	onSelect
}: PricingCardProps) {
	return (
		<div className={`pricing-card ${recommended ? 'pricing-card--recommended' : ''}`}>
			{recommended && <div className="pricing-card__badge">Recommandé</div>}

			<div className="pricing-card__header">
				<h3 className="pricing-card__name">{name}</h3>
				<div className="pricing-card__price">
					{price !== 'Sur devis' ? (
						<>
							<span className="pricing-card__amount">{price}</span>
							<span className="pricing-card__unit">{unit}</span>
						</>
					) : (
						<span className="pricing-card__custom">Sur devis</span>
					)}
				</div>
				<p className="pricing-card__description">{description}</p>
			</div>

			<ul className="pricing-card__features">
				{features.map((feature, index) => (
					<li key={index} className="pricing-card__feature">
						<svg
							className="pricing-card__check"
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
						>
							<circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.1" />
							<path
								d="M6 10L9 13L14 7"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						{feature}
					</li>
				))}
			</ul>

		{clientCost && (
			<div className="pricing-card__client-cost">
				<small>+ {clientCost}</small>
			</div>
		)}

		<button 
			onClick={onSelect}
			className={recommended ? 'button-primary' : 'button-secondary'}
		>
			{price === 'Sur devis' ? 'Nous contacter' : 'Choisir ce pack'}
		</button>
	</div>
	);
}
