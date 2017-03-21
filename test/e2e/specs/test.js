// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .pause(2000)
      .assert.elementPresent('.navbar')
      .verify.containsText('h2', 'Dataset catalog')

      // FSA branding header
      .verify.containsText('h1', 'FSA open data catalog')
      .expect.element('.view').to.be.present

    browser
      // Searching data set
      // Publication of all GPC transactions
      // 'audits' in to Search
      // Text doesn't exits
      .expect.element('td').to.have.value.equal('Publication of all GPC transactions')

    browser
      .setValue('input[type=text]', 'audits')

    browser
      .expect.element('td').to.not.have.value.equal('Publication of all GPC transactions')

      // .assert.elementCount('img', 1)
    browser.end()
  }
}
