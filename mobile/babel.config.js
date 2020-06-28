module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src/'],
        alias: {
          "@assets": "./src/assets",
          "@components": "./src/components",
          "@hooks": "./src/hooks",
          "@pages": "./src/pages",
          "@routes": "./src/routes",
          "@services": "./src/services",
          "@styles": "./src/styles",
          "@utils": "./src/utils",
        },
      },
    ],
  ],
};
