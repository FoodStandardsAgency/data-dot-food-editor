/*
  Development API endpoint for mocked server interaction
*/

import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

let dataset = Vue.resource('/metadata-repository/catalogue/dataset{/id}')
let element = Vue.resource('/metadata-repository/catalogue/dataset{/id}/element')

export function getDataset (query, cb) {
  dataset.get(query).then(function (d) {
    d.json().then(function (resp) {
      return cb(null, resp.item ? resp.item : resp.items)
    })
  }, function (e) {})
}

export function getElement (query, cb) {
  element.get(query).then(function (d) {
    d.json().then(function (resp) {
      return cb(null, resp.item ? resp.item : resp.items)
    })
  }, function (e) {})
}

export function getDirectorates (cb) {
  Vue.http.get('/static/api/directorates.json', {}).then(function (d) {
    d.json().then(function (directorates) {
      return cb(null, directorates)
    })
  }, function (e) {})
}
