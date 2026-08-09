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
			name: 'role',
			title: 'Rôle sur le projet',
			description: 'Ex: "Conception complète", "Design & développement"',
			type: 'string'
		},
		{
			name: 'resultLine',
			title: 'Résultat obtenu',
			description: 'Courte phrase affichée avec ↳ sur la carte (ex: "Rendre des données complexes faciles à comprendre")',
			type: 'string',
			validation: (Rule: any) =>
				Rule.max(120).warning('120 caractères max recommandé')
		},
		{
			name: 'body',
			title: 'Contenu détaillé',
			type: 'array',
			of: [{ type: 'block' }]
		},
		{
			name: 'storyTitle',
			title: 'Titre — Le projet',
			description:
				'Phrase d\'orientation affichée sous "Le projet" (ex: "Faire parler les données."). Si vide, le nom du projet est utilisé.',
			type: 'string'
		},
		{
			name: 'stackTitle',
			title: 'Titre — Ce qui a été créé',
			description:
				'Phrase affichée sous "Ce qui a été créé" (ex: "Une expérience claire à chaque étape."). Section masquée si vide.',
			type: 'string'
		},
		{
			name: 'highlights',
			title: 'Points forts — Ce qui a été créé',
			description:
				'3 blocs numérotés (titre + description) affichés sous le titre "Ce qui a été créé".',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{ name: 'title', title: 'Titre', type: 'string' },
						{
							name: 'description',
							title: 'Description',
							type: 'text',
							rows: 2
						}
					]
				}
			],
			validation: (Rule: any) => Rule.max(3)
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
