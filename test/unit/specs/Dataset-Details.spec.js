import Vue from 'vue'
// import DatasetDetails from 'src/Dataset-Details'
import VueRouter from 'vue-router' // Router
import ApiMock from './api-mock' // Router

const ExampleInjector = require('!!vue?inject!src/Dataset-Details')

const ExampleWithMocks = ExampleInjector({
  // mock it
  './Api': ApiMock
})

describe('Dataset-Details.vue', () => {
  it('should render correct contents', () => {
    // const propsData = {
    //   success: 'success',
    //   warn: 'warn'
    // }

    Vue.use(VueRouter)

    // Configure routes
    const router = new VueRouter({
      mode: 'history',
      base: __dirname,
      routes: [
      ]
    })

    const Ctor = Vue.extend(ExampleWithMocks)

    const vm = new Ctor({router}).$mount()

    expect(vm.$el.querySelector('#details').textContent)
      .to.contain('Sorry')
  })
})
