import Vue from 'vue'
import Messages from 'src/components/Messages'

describe('Messages.vue', () => {
  it('should render correct contents', () => {
    const propsData = {
      success: 'success',
      warn: 'warn'
    }

    const Ctor = Vue.extend(Messages)
    const vm = new Ctor({ propsData }).$mount()

    expect(vm.$el.querySelector('.message.successMsg').textContent)
      .to.contain('success')

    expect(vm.$el.querySelector('.message.warnMsg').textContent)
      .to.contain('warn')
  })
})
