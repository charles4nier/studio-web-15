import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
// Imports relatifs nécessaires car Sanity Studio (Vite) ne reconnaît pas les alias TypeScript
import home from '../../features/home/home.schema';
import realisation from '../../features/realisations/realisations.schema';
import post from '../../features/blog/blog.schema';

export default defineConfig({
	name: 'default',
	title: 'Studio Web 15',
	projectId: '7lu7xtgt',
	dataset: 'production',
	plugins: [deskTool()],
	schema: {
		types: [home, realisation, post]
	}
});
