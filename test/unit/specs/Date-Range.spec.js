import Vue from 'vue'
import DateRange from 'src/components/Date-Range'

describe('Date-range.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(DateRange)
    })
    expect(vm.$el.querySelector('span.daterange').textContent)
      .to.contain('contains')
  })
})
