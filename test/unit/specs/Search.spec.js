import Vue from 'vue'
import Component from 'src/components/Search'

describe('Search.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Component, {})
    })
    expect(vm.$el.querySelector('button.btn')).to.exist
  })
})
