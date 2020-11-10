import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import VeeValidate, { Validator } from 'vee-validate'
import vee8601 from '@/vee-iso8601'
import DatasetDetails from '@/Dataset-Details'
import Messages from '@/components/Messages'
import ArrLength from '@/components/Arr-Length'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()
Validator.extend('iso8601', vee8601)
localVue.use(VeeValidate)
localVue.component('messages', Messages)
localVue.component('arr-length', ArrLength)

jest.mock("@/Api")

describe('Dataset-Details.vue', () => {
  it('should render correct contents', () => {
    const wrapper = shallowMount(DatasetDetails, {
      localVue,
      router,
    })

    expect(wrapper.find('#details').text()).toContain('Title')
  })
})
