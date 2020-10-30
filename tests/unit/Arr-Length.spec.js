import { shallowMount } from '@vue/test-utils'
import DateRange from '@/components/Arr-Length'

describe('Arr-Length.vue', () => {
  it('should render correct contents', () => {
    const wrapper = shallowMount(DateRange, {
      propsData: {
        arr: [{}]
      }
    })

    expect(wrapper.find('.daterange').text()).toContain('contains 1 element(s)')
  })
})
