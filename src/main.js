// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App'
import DatasetDetails from './Dataset-Details'
import DatasetList from './Dataset-List'
var VueTables = require('vue-tables-2')

// TODO - clean up global jQuery!
import $ from 'jquery'
window.$ = $

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueTables.client, {}, false)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: DatasetList },
    { path: '/dataset/:id', component: DatasetDetails }// ,
    // { path: '/bar', component: Bar }
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
