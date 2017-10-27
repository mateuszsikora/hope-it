module.exports = {
  cache: {
    cacheId: 'hope_it',
    runtimeCaching: [{
      handler: 'fastest',
      urlPattern: '\/$'
    }],
    staticFileGlobs: ['dist/**/*']
  },
  manifest: {
    background: '#FFFFFF',
    title: 'hope_it',
    short_name: 'PWA',
    theme_color: '#FFFFFF'
  }
};
