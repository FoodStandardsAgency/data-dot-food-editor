/*
Vue app configuration
*/
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'date-input-polyfill' // Polyfill for HTML5 Date input

import Vue from 'vue'
import Vuex from 'vuex' // State management
import VueRouter from 'vue-router' // Router
import VeeValidate, { Validator } from 'vee-validate'
import App from './App' // Compositor

import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

Raven.config(process.env.NODE_ENV == 'production' ? 'https://aaca4a3903f348ea974ed415f69018a6@sentry.io/160077' : false)
    .addPlugin(RavenVue, Vue)
    .install()

import Login from './Login'
import DatasetDetails from './Dataset-Details'
import DatasetList from './Dataset-List'
import ElementList from './Element-List'
import ElementDetails from './Element-Details'
import Grid from 'vue2-bootstrap-table'
import Search from './components/Search.vue'
import DateRange from './components/Date-Range'
import ArrLength from './components/Arr-Length'
import Moment from 'vue-moment'
import Messages from './components/Messages'
import Reports from './Reports'
import Publish from './Publish'
import Help from './Help'
import Chart from 'vue-echarts'
import vee8601 from './vee-iso8601'
import VuejsDialog from 'vuejs-dialog';
 
// include the default style
import 'vuejs-dialog/dist/vuejs-dialog.min.css';

Validator.extend('iso8601', vee8601)

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Moment)
Vue.use(VeeValidate)
Vue.use(VuejsDialog);

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
  base: '/catalog-editor',
  routes: [
    { path: '/', component: DatasetList, name: 'datasets' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/reports', component: Reports, name: 'reports' },
    { path: '/publish', component: Publish, name: 'publish' },
    { path: '/help', component: Help, name: 'help' },
    { path: '/dataset/:id?', component: DatasetDetails, name: 'dataset' },
    { path: '/dataset/:id/elements', component: ElementList, name: 'elements' },
    { path: '/dataset/:id/elements/:eid', component: ElementDetails, name: 'element' }
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
