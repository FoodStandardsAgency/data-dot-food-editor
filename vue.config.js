module.exports = {
  devServer: {
    proxy: {
      '/catalog/': {
        target: 'https://fsa-dev-catalog-editor.epimorphics.net'
      }
    }
  },
  configureWebpack: {
    
  }
}
