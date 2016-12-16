import Vue from 'vue'
import Component from 'src/components/Grid'

describe('Grid.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Component)
    })
    expect(vm.$el.querySelector('span.daterange').textContent)
      .to.contain('contains')
  })
})
