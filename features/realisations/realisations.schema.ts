export default {
	name: 'realisation',
	title: 'Réalisation',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Nom du projet',
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
			name: 'client',
			title: 'Client',
			type: 'string'
		},
		{
			name: 'category',
			title: 'Catégorie',
			type: 'string',
			options: {
				list: [
					{ title: 'Site vitrine', value: 'Site vitrine' },
					{ title: 'E-commerce', value: 'E-commerce' },
					{ title: 'Application', value: 'Application' },
					{ title: 'Autre', value: 'Autre' }
				]
			}
		},
		{
			name: 'year',
			title: 'Année',
			type: 'string'
		},
		{
			name: 'excerpt',
			title: 'Description courte',
			description: 'Affichée sur la carte dans la liste des réalisations',
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
			name: 'gallery',
			title: 'Galerie',
			type: 'array',
			of: [
				{
					type: 'image',
					options: { hotspot: true },
					fields: [
						{
							name: 'alt',
							title: 'Texte alternatif',
							type: 'string'
						}
					]
				}
			]
		},
		{
			name: 'technologies',
			title: 'Technologies',
			type: 'array',
			of: [{ type: 'string' }],
			options: { layout: 'tags' }
		},
		{
			name: 'url',
			title: 'Lien du site',
			type: 'url'
		},
		{
			name: 'body',
			title: 'Contenu détaillé',
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
			name: 'order',
			title: "Ordre d'affichage",
			description: 'Les valeurs les plus basses apparaissent en premier',
			type: 'number'
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
			title: "Ordre d'affichage",
			name: 'orderAsc',
			by: [{ field: 'order', direction: 'asc' }]
		},
		{
			title: 'Plus récent',
			name: 'yearDesc',
			by: [{ field: 'year', direction: 'desc' }]
		}
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'client',
			media: 'coverImage'
		}
	}
};
