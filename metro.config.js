const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname)

// Fix: o Metro resolve o tslib pela build ESM por padrão (via "exports"
// do package.json), e essa build não tem `default export`. Libs que
// dependem de `tslib.default` (ex: react-native-qrcode-svg -> javascript-qrcode)
// quebram só no bundle web por causa disso. Forçando a build CJS aqui.
config.resolver.extraNodeModules = {
  ...(config.resolver.extraNodeModules ?? {}),
  tslib: require.resolve("tslib/tslib.js"),
}

module.exports = withNativeWind(config, { input: './app/global.css' })