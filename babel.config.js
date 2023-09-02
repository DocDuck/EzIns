module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "@babel/preset-typescript"],
    plugins: [
      [
        "module-resolver",
        {
					extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.android.js',
            '.android.tsx',
            '.ios.js',
            '.ios.tsx'
          ],
          root: ["./src"],
          alias: {
            app: "./src/app",
            pages: "./src/pages",
            widgets: "./src/widgets",
            features: "./src/features",
            entities: "./src/entities",
            shared: "./src/shared",
          },
        },
      ]
    ],
  };
};
