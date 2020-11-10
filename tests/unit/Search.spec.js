import { shallowMount } from '@vue/test-utils'
import Search from '@/components/Search'

describe('Search.vue', () => {
  it('should render correct contents', () => {
    const wrapper = shallowMount(Search, {})

    expect(wrapper.find('button.btn').exists()).toBe(true)
  })
})
