module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Updated plugin name as per the warning
      "react-native-worklets/plugin",
    ],
  };
};
