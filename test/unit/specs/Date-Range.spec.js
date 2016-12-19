import Vue from 'vue'
import DateRange from 'src/components/Date-Range'

describe('Date-range.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(DateRange, {
        domProps: {
          data: [{arr: [{a: '2014-01-02', b: '2014-02-03'}], startProp: 'a', endProp: 'b'}]
        }
      })
    })
    // console.log(vm.$el)
    // expect(vm.$el.querySelector('.daterange')).to.exist
  })
})
