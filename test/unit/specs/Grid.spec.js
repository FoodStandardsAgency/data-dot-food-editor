import Vue from 'vue'
import Component from 'src/components/Grid'

describe('Grid.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Component, {
        domProps: {
          data: [{'a': 11}], columns: [{'title': 'myTitle', 'path': 'a'}], filterKey: ''
        }
      })
    })
    expect(vm.$el.querySelector('th').textContent)
      .to.contain('MyTitle') // Title has been uppercased
  })
})
