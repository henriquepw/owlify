module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src/'],
        alias: {
          "@assets": "./src/assets",

          /* Components */
          "@atoms": "./src/components/atoms",
          "@molecules": "./src/components/molecules",
          "@organisms": "./src/components/organisms",
          "@templates": "./src/components/templates",

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
