import Vue from 'vue'
import Navigation from 'src/components/Navigation'

describe('Navigation.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Navigation)
    })
    expect(vm.$el.querySelector('.nav h2').textContent)
      .to.contain('Dataset catalog')
  })
})
