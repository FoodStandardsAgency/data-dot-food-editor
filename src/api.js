/*
  Development API endpoint for mocked server interaction
*/

import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

let dataset = Vue.resource('/metadata-repository/catalogue/dataset{/id}')
let nDataset = Vue.resource('/metadata-repository/catalogue{/id}')
let element = Vue.resource('/metadata-repository/catalogue/dataset{/id}/element{/eid}')

export function getDataset (query, cb) {
  dataset.get(query).then(function (d) {
    d.json().then(function (resp) {
      return cb(null, resp.item ? resp.item : resp.items)
    })
  }, function (e) {})
}

export function saveDataset (query, pObj, cb) {
  if (query.id === 'new') {
    nDataset.save({}, pObj).then(function (d) {
      return cb(null, true)
    }, function (e) {})
  } else {
    dataset.update(query, pObj).then(function (d) {
      return cb(null, true)
    }, function (e) {})
  }
}

export function removeDataset (query, cb) {
  dataset.remove(query).then(function (d) {
    return cb(null, true)
  }, function (e) {})
}

export function getElement (query, cb) {
  element.get(query).then(function (d) {
    d.json().then(function (resp) {
      return cb(null, resp.item ? resp.item : resp.items)
    })
  }, function (e) {})
}

export function saveElement (query, pObj, cb) {
  if (query.id === 'new') {
    dataset.save({}, pObj).then(function (d) {
      return cb(null, true)
    }, function (e) {})
  } else {
    dataset.save(query, pObj).then(function (d) {
      return cb(null, true)
    }, function (e) {})
  }
}

export function removeElement (query, cb) {
  element.remove(query).then(function (d) {
    return cb(null, true)
  }, function (e) {})
}

export function getDirectorates (cb) {
  Vue.http.get('/static/api/directorates.json', {}).then(function (d) {
    d.json().then(function (directorates) {
      return cb(null, directorates)
    })
  }, function (e) {})
}
