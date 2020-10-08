module.exports = {
  devServer: {
    proxy: {
      '/catalog/editor/': { // baseEndpoint
        target: 'https://fsa-dev-catalog-editor.epimorphics.net'
      },
      '/catalog/system/security/': { // securityEndpoint
        target: 'https://fsa-dev-catalog-editor.epimorphics.net'
      },
      '/catalog-editor/static/api/Datatypes.json': { // datatypesEndpoint
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
