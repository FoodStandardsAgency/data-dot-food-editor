/*
Vue app configuration
*/
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import Vuex from 'vuex' // State management
import VueRouter from 'vue-router' // Router
import App from './App' // Compositor

import DatasetDetails from './Dataset-Details'
import DatasetList from './Dataset-List'
import Grid from './components/Grid.vue'
import Search from './components/Search.vue'
import moment from 'vue-moment'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(moment) // Vue moment.js date filter

// Register custom components as globally available
Vue.component('grid', Grid)
Vue.component('search', Search)

// Configure routes
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: DatasetList, name: 'list' },
    { path: '/dataset/:id', component: DatasetDetails, name: 'dataset' }
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
