import { shallowMount } from '@vue/test-utils'
import Messages from '@/components/Messages'
import bus from '@/components/Bus'

describe('Messages.vue', () => {
  it('should render correct contents', async () => {
    const wrapper = shallowMount(Messages, {})

    bus.$emit('message', {
      str: "success",
      success: true
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.message.successMsg').text()).toContain('success')

    bus.$emit('message', {
      str: "warn",
      success: false
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.message.warnMsg').text()).toContain('warn')
  })
})
