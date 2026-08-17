export default {
	name: 'post',
	title: 'Article de blog',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Titre',
			type: 'string',
			validation: (Rule: any) => Rule.required()
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: { source: 'title', maxLength: 96 },
			validation: (Rule: any) => Rule.required()
		},
		{
			name: 'category',
			title: 'Catégorie',
			type: 'string',
			options: {
				list: [
					{ title: 'Guide pratique', value: 'Guide pratique' },
					{ title: 'Étude de cas', value: 'Étude de cas' },
					{ title: 'Technique', value: 'Technique' },
					{ title: 'Actualité', value: 'Actualité' }
				]
			}
		},
		{
			name: 'publishedAt',
			title: 'Date de publication',
			type: 'datetime',
			validation: (Rule: any) => Rule.required()
		},
		{
			name: 'excerpt',
			title: 'Description courte',
			description: 'Affichée sur la carte dans la liste des articles',
			type: 'text',
			rows: 3,
			validation: (Rule: any) =>
				Rule.max(200).warning('200 caractères max recommandé')
		},
		{
			name: 'coverImage',
			title: 'Image de couverture',
			type: 'image',
			options: { hotspot: true },
			fields: [
				{ name: 'alt', title: 'Texte alternatif', type: 'string' }
			],
			validation: (Rule: any) => Rule.required()
		},
		{
			name: 'body',
			title: 'Contenu',
			type: 'array',
			of: [{ type: 'block' }]
		},
		{
			name: 'featured',
			title: 'Mise en avant',
			description: 'Affiché en priorité dans la liste',
			type: 'boolean',
			initialValue: false
		},
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
						Rule.max(60).warning(
							'Le titre doit faire moins de 60 caractères'
						)
				},
				{
					name: 'metaDescription',
					title: 'Description SEO',
					type: 'text',
					validation: (Rule: any) =>
						Rule.max(160).warning(
							'La description doit faire moins de 160 caractères'
						)
				}
			]
		}
	],
	orderings: [
		{
			title: 'Plus récent',
			name: 'publishedAtDesc',
			by: [{ field: 'publishedAt', direction: 'desc' }]
		}
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'category',
			media: 'coverImage'
		}
	}
};
