import Vue from 'vue'
import Footer from 'src/components/Footer'

describe('Footer.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Footer)
    })
    expect(vm.$el.querySelector('.container').textContent)
      .to.contain('Epimorphics')
  })
})
