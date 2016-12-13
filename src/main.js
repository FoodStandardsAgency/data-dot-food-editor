// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App'
import DatasetDetails from './Dataset-Details'
import DatasetList from './Dataset-List'
import Grid from './components/Grid.vue'
import Search from './components/Search.vue'

// TODO - clean up global jQuery!
import $ from 'jquery'
window.$ = $

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(require('vue-moment'))

Vue.component('grid', Grid)
Vue.component('search', Search)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: DatasetList, name: 'list' },
    { path: '/dataset/:id', component: DatasetDetails, name: 'dataset' }// ,
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
