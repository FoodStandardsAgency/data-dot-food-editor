import { shallowMount } from '@vue/test-utils'
import DateRange from '@/components/Arr-Length'

describe('Date-Range.vue', () => {
  it('should render correct contents', () => {
    const wrapper = shallowMount(DateRange, {
      propsData: {
        arr: [{start: '1970-1-1', end: '1971-1-1'}], // data
        startProp: 'start',
        endProp: 'end'
      }
    })

    expect(wrapper.find('.daterange').text()).toContain('element')
    expect(wrapper.find('.daterange').text()).toContain('1')
  })
})
