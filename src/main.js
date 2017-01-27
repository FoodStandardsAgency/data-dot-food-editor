/*
Vue app configuration
*/
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'date-input-polyfill' // Polyfill for HTML5 Date input

import Vue from 'vue'
import Vuex from 'vuex' // State management
import VueRouter from 'vue-router' // Router
import VeeValidate from 'vee-validate'
import App from './App' // Compositor

import DatasetDetails from './Dataset-Details'
import ElementList from './Element-List'
import ElementDetails from './Element-Details'
import DatasetList from './Dataset-List'
import Grid from 'vue2-bootstrap-table'
import Search from './components/Search.vue'
import DateRange from './components/Date-Range'
import ArrLength from './components/Arr-Length'
import Moment from 'vue-moment'
import Messages from './components/Messages'
import Reports from './Reports'
import Chart from 'vue-echarts'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Moment)
Vue.use(VeeValidate)

// Register custom components as globally available
Vue.component('grid', Grid)
Vue.component('search', Search)
Vue.component('date-range', DateRange)
Vue.component('arr-length', ArrLength)
Vue.component('messages', Messages)
Vue.component('chart', Chart)

// Configure routes
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: DatasetList, name: 'datasets' },
    { path: '/reports', component: Reports, name: 'reports' },
    { path: '/dataset/:id?', component: DatasetDetails, name: 'dataset' },
    { path: '/dataset/:id/elements', component: ElementList, name: 'elements' },
    { path: '/dataset/:id/elements/:eid', component: ElementDetails, name: 'element' }
  ]
})

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  template: `
    <div id="app">
      <app></app>
    </div>
    `,
  components: {App}
})
