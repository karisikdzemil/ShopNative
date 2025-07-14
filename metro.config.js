// metro.config.js
const { getDefaultConfig } = require("@expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Omogući .cjs fajlove ako je potrebno (nije uvek)
config.resolver.sourceExts.push("cjs");

module.exports = config;
module.exports = withNativeWind(config, { input: "./app/globals.css"});
