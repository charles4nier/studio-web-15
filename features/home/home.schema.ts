export default {
	name: 'home',
	title: 'Page Accueil',
	type: 'document',
	fields: [
		{
			name: 'seo',
			title: 'SEO',
			type: 'object',
			fields: [
				{
					name: 'metaTitle',
					title: 'Titre SEO',
					type: 'string',
					validation: (Rule: any) =>
						Rule.max(60).warning('Le titre doit faire moins de 60 caractères')
				},
				{
					name: 'metaDescription',
					title: 'Description SEO',
					type: 'text',
					validation: (Rule: any) =>
						Rule.max(160).warning('La description doit faire moins de 160 caractères')
				},
				{
					name: 'openGraphImage',
					title: 'Image de partage (OG)',
					type: 'image',
					options: { hotspot: true }
				}
			]
		},
		{
			name: 'hero',
			title: 'Section Hero',
			type: 'object',
			fields: [
				{
					name: 'title',
					title: 'Titre principal',
					type: 'string',
					validation: (Rule: any) => Rule.required()
				},
				{
					name: 'subtitle',
					title: 'Sous-titre',
					type: 'text'
				},
				{
					name: 'ctaLabel',
					title: 'Label du bouton CTA',
					type: 'string',
					initialValue: 'Discutons de votre projet'
				}
			]
		},
		{
			name: 'services',
			title: 'Services',
			type: 'object',
			fields: [
				{
					name: 'title',
					title: 'Titre',
					type: 'string',
					initialValue: 'Nos services'
				},
				{
					name: 'items',
					title: 'Liste des services',
					type: 'array',
					of: [
						{
							type: 'object',
							fields: [
								{
									name: 'title',
									title: 'Titre',
									type: 'string'
								},
								{
									name: 'description',
									title: 'Description',
									type: 'text'
								}
							]
						}
					]
				}
			]
		}
	],
	preview: {
		select: {
			title: 'seo.metaTitle',
			subtitle: 'seo.metaDescription'
		}
	}
};
