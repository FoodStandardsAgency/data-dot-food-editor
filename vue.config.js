module.exports = {
  devServer: {
    proxy: {
      '/catalog/': {
        target: 'https://fsa-dev-catalog-editor.epimorphics.net'
      }
    }
  },
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Dataset Editor'
    }
  },
  configureWebpack: {
    // All webpack related configs go here
  }
}
