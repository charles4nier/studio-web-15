import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
// Imports relatifs nécessaires car Sanity Studio (Vite) ne reconnaît pas les alias TypeScript
import home from '../../features/home/home.schema';

export default defineConfig({
	name: 'default',
	title: 'Studio Web 15',
	projectId: 'tgge8srz',
	dataset: 'production',
	plugins: [deskTool()],
	schema: {
		types: [home]
	}
});
