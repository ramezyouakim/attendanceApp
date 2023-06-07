/* eslint-disable camelcase */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getDefaultConfig } = require('expo/metro-config')

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig(__dirname)
  return {
    transformer: {
      assetPlugins: ['expo-asset/tools/hashAssetFiles'],
      // https://docs.sentry.io/platforms/react-native/troubleshooting/#minified-names-in-production
      minifierConfig: {
        keep_classnames: true, // Preserve class names
        keep_fnames: true, // Preserve function names
        mangle: {
          keep_classnames: true, // Preserve class names
          keep_fnames: true, // Preserve function names
        },
      },
    },
    resolver: {
      resolverMainFields: ['sbmodern', 'react-native', 'browser', 'main'],
    },
  }
})()
