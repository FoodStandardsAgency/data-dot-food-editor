/*
  Development API endpoint for mocked server interaction
*/

import Vue from 'vue'
import VueResource from 'vue-resource'
import blankDataset from './blank-dataset'
import blankElement from './blank-element'
import blankDistribution from './blank-distribution'
Vue.use(VueResource)

let dataset = Vue.resource('/catalog/dataset{/id}', {}, {}, {headers: {'Content-type': 'application/ld+json'}})
// let nDataset = Vue.resource('/metadata-repository/catalog{/id}', {}, {}, {headers: {'Content-type': 'application/ld+json'}})
let element = Vue.resource('/catalog/dataset{/id}/element{/eid}', {}, {}, {headers: {'Content-type': 'application/ld+json'}})
let keyword = Vue.resource('/catalog/keyword{/id}', {}, {}, {headers: {'Content-type': 'application/ld+json'}})
let directoratesEndpoint = '/catalog/directorates'

/* - - - - - - - - Dataset functions - - - - - - - - - - -  */
export function getDataset (query) {
  return dataset.get(query)
    .then(parse) // to JSON
    .then(itemItems) // Remove item or items JSON response ambiguity
    .then(arrSingletoObj) // If a single object in array remove array
    .then(forceArrPropKeyword) // Ensure attribute is always array
    .then((jsn) => {
      return mergeProto(jsn, blankDataset) // Ensure has all objects keys defined
    })
    .then(simplifyDirectorate) // Simplify directorate object
    .then(removeRPeriod) // Simplify directorate object
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
    .then((jsn) => {
      // Ensure each distribution is based on the distribution prototype
      jsn.distribution = mergeProto(jsn.distribution, blankDistribution)
      return jsn
    })
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
  return Vue.http.get(directoratesEndpoint, {}).then(parse).then(itemItems)
}

export function getDatatypes () {
  return Vue.http.get('/static/api/Datatypes.json', {}).then(parse)
}

/* - - - - - - - Helper functions - - - - - - - - - */
// Returned data structure can be of either items or item
// Remove ambiguity
let itemItems = (jsn) => {
  return jsn.item ? jsn.item : jsn.items
}

// Ensure object has all attribute keys available
// This is so Vue can attach watchers to them
let mergeProto = (jsn, proto) => {
  if (jsn instanceof Array) {
    return jsn.map((jsnEl) => {
      return mergeProto(jsnEl, proto)
    })
  }
  return Object.assign(JSON.parse(JSON.stringify(proto)), jsn)
}

// Simplify directorate property to allow simple comparison on select element
// @id is all that's needed to update
let simplifyDirectorate = (jsn) => {
  if (jsn.accrualPeriodicity) {
    jsn.accrualPeriodicity = jsn.accrualPeriodicity.substring(3, 10000)
  }
  return jsn
}

// Simplify directorate property to allow simple comparison on select element
// @id is all that's needed to update
let removeRPeriod = (jsn) => {
  if (jsn.repeat && typeof jsn.directorate === 'object') {
    jsn.directorate = jsn.directorate['@id']
  }
  return jsn
}

// If a single object in array, remove array
let arrSingletoObj = (jsn) => {
  return (typeof jsn.length !== 'undefined' && jsn.length === 1) ? jsn[0] : jsn
}

// Ensures property value is an array
// Fix issue where if only 1 keyword it's not an array
let forceArrProp = (jsn, attrName) => {
  if (jsn[attrName]) {
    jsn[attrName] = [].concat(jsn[attrName])
  }
  return jsn
}

// Parse JSON string to object
let parse = (d) => {
  return d.json()
}

// Transform object to single attribute
let extractAttr = (d, attrName) => {
  return d.map((el) => {
    return el[attrName]
  })
}

let extractPrefLabel = (d) => {
  return extractAttr(d, 'prefLabel')
}

let forceArrPropKeyword = (jsn) => {
  return forceArrProp(jsn, 'keyword')
}

let forceArrPropDistribution = (jsn) => {
  return forceArrProp(jsn, 'distribution')
}
