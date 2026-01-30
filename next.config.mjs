/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.sanity.io',
				pathname: '/images/**'
			}
		],
		formats: ['image/avif', 'image/webp'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'shared/styles')],
		prependData: `@import "variables.scss";`
	},
	compress: true,
	eslint: {
		ignoreDuringBuilds: true,
	  },
	poweredByHeader: false,
	webpack: (config, { isServer }) => {
		config.resolve.alias = {
			...config.resolve.alias,
			'@shared': path.join(__dirname, 'shared'),
			'@features': path.join(__dirname, 'features'),
			'@types': path.join(__dirname, 'types')
		};

		if (!isServer) {
			config.optimization = {
				...config.optimization,
				splitChunks: {
					chunks: 'all',
					cacheGroups: {
						default: false,
						vendors: false,
						framerMotion: {
							name: 'framer-motion',
							test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
							priority: 20,
							reuseExistingChunk: true
						},
						sanity: {
							name: 'sanity',
							test: /[\\/]node_modules[\\/]@sanity[\\/]/,
							priority: 20,
							reuseExistingChunk: true
						},
						commons: {
							name: 'commons',
							minChunks: 2,
							priority: 10,
							reuseExistingChunk: true
						}
					}
				}
			};
		}

		return config;
	}
};

export default nextConfig;
