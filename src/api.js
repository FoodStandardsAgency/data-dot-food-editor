/*
  Development API endpoint for mocked server interaction
*/

import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

let dataset = Vue.resource('/metadata-repository/catalogue/dataset{/id}')
let nDataset = Vue.resource('/metadata-repository/catalogue{/id}')
let element = Vue.resource('/metadata-repository/catalogue/dataset{/id}/element{/eid}')

export function getDataset (query) {
  return dataset.get(query).then(parse).then(itemItems)
}

let itemItems = (jsn) => {
  return jsn.item ? jsn.item : jsn.items
}

let parse = (d) => {
  return d.json()
}

export function saveDataset (query, pObj) {
  if (query.id === 'new') {
    return nDataset.save({}, pObj)
  } else {
    return dataset.update(query, pObj)
  }
}

export function removeDataset (query) {
  return dataset.remove(query)
}

export function getElement (query) {
  return element.get(query).then(parse).then(itemItems)
}

export function saveElement (query, pObj) {
  if (query.id === 'new') {
    return dataset.save({}, pObj)
  } else {
    return dataset.save(query, pObj)
  }
}

export function removeElement (query) {
  return element.remove(query)
}

export function getDirectorates () {
  return Vue.http.get('/static/api/directorates.json', {}).then(parse)
}
