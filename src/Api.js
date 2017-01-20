/*
  Development API endpoint for mocked server interaction
*/

import Vue from 'vue'
import VueResource from 'vue-resource'
import blankDataset from './blank-dataset'
import blankElement from './blank-element'
Vue.use(VueResource)

let dataset = Vue.resource('/metadata-repository/catalog/dataset{/id}', {}, {}, {headers: {'Content-type': 'application/ld+json'}})
// let nDataset = Vue.resource('/metadata-repository/catalog{/id}', {}, {}, {headers: {'Content-type': 'application/ld+json'}})
let element = Vue.resource('/metadata-repository/catalog/dataset{/id}/element{/eid}', {}, {}, {headers: {'Content-type': 'application/ld+json'}})
let keyword = Vue.resource('/metadata-repository/catalog/keyword{/id}', {}, {}, {headers: {'Content-type': 'application/ld+json'}})

/* - - - - - - - - Dataset functions - - - - - - - - - - -  */
export function getDataset (query) {
  return dataset.get(query)
    .then(parse)
    .then(itemItems)
    .then(arrSingletoObj)
    .then(forceArrPropKeyword)
    .then((jsn) => {
      return mergeProto(jsn, blankDataset)
    })
    .then(simplifyDirectorate)
}

export function getDatasets (query) {
  return dataset.get(query)
    .then(parse)
    .then(itemItems)
}

export function saveDataset (query, pObj) {
  // Populate the keywords property from the keyword field
  pObj.keywords = pObj.keyword.map(function (word) {
    return 'http://data.food.gov.uk/catalog/keyword/' + word
  })

  if (query.id === 'new') {
    return dataset.save({}, pObj)
  } else {
    return dataset.update(query, pObj)
  }
}

export function removeDataset (query) {
  return dataset.remove(query)
}

/* - - - - - - - - Element functions - - - - - - - - - - -  */
export function getElement (query) {
  return element.get(query)
    .then(parse)
    .then(itemItems)
    .then(arrSingletoObj)
    .then((jsn) => {
      return mergeProto(jsn, blankElement)
    })
    .then(forceArrPropDistribution)
}

export function getElements (query) {
  return element.get(query)
    .then(parse)
    .then(itemItems)
}

export function saveElement (query, pObj) {
  // Populate the temporal property from the date fields
  pObj.temporal = pObj.startDate + '/' + pObj.endDate

  if (query.eid === 'new') {
    delete query.eid
    return element.save(query, pObj)
  } else {
    return element.update(query, pObj)
  }
}

export function removeElement (query) {
  return element.remove(query)
}

/* - - - - - - - - Keyword functions - - - - - - - - - - -  */
export function getKeywordsObjects (query) {
  return keyword.get(query)
    .then(parse)
    .then(itemItems)
}

export function getKeywordsText (query) {
  return keyword.get(query)
    .then(parse)
    .then(itemItems)
    .then(extractPrefLabel)
}

export function saveKeyword (query, pObj) {
  return keyword.save({}, pObj)
}

/* - - - - - - - - Additional functions - - - - - - - - - - -  */
export function getDirectorates () {
  return Vue.http.get('/metadata-repository/catalog/directorates', {}).then(parse).then(itemItems)
}

export function getDatatypes () {
  return Vue.http.get('/static/api/Datatypes.json', {}).then(parse)
}

/* - - - - - - - Helper functions - - - - - - - - - */
let itemItems = (jsn) => {
  return jsn.item ? jsn.item : jsn.items
}

let mergeProto = (jsn, proto) => {
  // Ensure object has all keys available
  // This is so Vue can attach watchers to them
  let merged = Object.assign(JSON.parse(JSON.stringify(proto)), jsn)
  return merged
}

let simplifyDirectorate = (jsn) => {
  // Simplify directorate property to allow simple comparison on select element
  // @id is all that's needed to update
  if (jsn.directorate && typeof jsn.directorate === 'object') {
    console.log(jsn.directorate)
    jsn.directorate = jsn.directorate['@id']
  }
  return jsn
}

let arrSingletoObj = (jsn) => {
  return (typeof jsn.length !== 'undefined' && jsn.length === 1) ? jsn[0] : jsn
}

let forceArrProp = (jsn, attrName) => {
  // Fix issue where if only 1 keyword it's not an array
  if (jsn[attrName]) {
    jsn[attrName] = [].concat(jsn[attrName])
  }
  return jsn
}

let forceArrPropKeyword = (jsn) => {
  return forceArrProp(jsn, 'keyword')
}

let forceArrPropDistribution = (jsn) => {
  return forceArrProp(jsn, 'distribution')
}

let parse = (d) => {
  return d.json()
}

let extractAttr = (d, attrName) => {
  return d.map((el) => {
    return el[attrName]
  })
}

let extractPrefLabel = (d) => {
  return extractAttr(d, 'prefLabel')
}
