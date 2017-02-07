import Vue from 'vue'
import DateRange from 'src/components/Date-Range'
import Moment from 'vue-moment'

describe('Date-range.vue', () => {
  it('should render correct contents', () => {
    const propsData = {
      arr: [{start: '1970-1-1', end: '1971-1-1'}], // data
      startProp: 'start',
      endProp: 'end'
    }

    Vue.use(Moment)

    const Ctor = Vue.extend(DateRange)
    const vm = new Ctor({ propsData }).$mount()

    expect(vm.$el.querySelector('.daterange').textContent)
      .to.contain('element')

    expect(vm.$el.querySelector('.daterange').textContent)
      .to.contain('1')
  })
})
