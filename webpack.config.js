const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.
	  config.resolve.alias = {
    ...config.resolve.alias,

    'api': path.resolve(__dirname, 'src/api/'),
    'pages': path.resolve(__dirname, 'src/pages/'),
    'widgets': path.resolve(__dirname, 'src/widgets/'),
    'features': path.resolve(__dirname, 'src/features/'),
    'entities': path.resolve(__dirname, 'src/entities/'),
    'shared': path.resolve(__dirname, 'src/shared/'),
    'assets': path.resolve(__dirname, 'src/assets/'),
	};
  return config;
};
