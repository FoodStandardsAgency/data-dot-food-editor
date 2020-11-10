import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Navigation from '@/components/Navigation'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

describe('Navigation.vue', () => {
  it('should render correct contents', () => {
    const wrapper = shallowMount(Navigation, {
      localVue,
      router,
    })

    expect(wrapper.find('.nav h2').text()).toContain('Dataset catalog')
  })
})
