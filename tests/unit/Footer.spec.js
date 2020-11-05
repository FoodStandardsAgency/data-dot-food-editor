import { shallowMount } from '@vue/test-utils'
import Footer from '@/components/Footer'

describe('Footer.vue', () => {
  it('should render correct contents', () => {
    const wrapper = shallowMount(Footer, {})

    expect(wrapper.find('.container').text()).toContain('Epimorphics')
  })
})
