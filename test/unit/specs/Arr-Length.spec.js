import Vue from 'vue'
import DateRange from 'src/components/Arr-Length'

describe('Arr-Length.vue', () => {
  it('should render correct contents', () => {
    const propsData = {
      arr: [{}]
    }

    const Ctor = Vue.extend(DateRange)
    const vm = new Ctor({ propsData }).$mount()

    expect(vm.$el.querySelector('.daterange').textContent)
      .to.contain('contains 1 element(s)')
  })
})
