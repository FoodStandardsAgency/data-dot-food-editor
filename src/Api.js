/*
  Development API endpoint for mocked server interaction
*/

import Vue from 'vue'
import VueResource from 'vue-resource'
import blankDataset from './proto/blank-dataset'
import blankElement from './proto/blank-element'
import blankDistribution from './proto/blank-distribution'
Vue.use(VueResource)

let baseEndpoint = '/catalog/editor/'
let dataset = Vue.resource(baseEndpoint + 'dataset{/id}', {}, {}, {headers: {'Content-type': 'application/ld+json'}})
let element = Vue.resource(baseEndpoint + 'dataset{/id}/element{/eid}', {}, {}, {headers: {'Content-type': 'application/ld+json'}})
let keyword = Vue.resource(baseEndpoint + 'keyword{/id}', {}, {}, {headers: {'Content-type': 'application/ld+json'}})
let directoratesEndpoint = baseEndpoint + 'directorates'
let activitiesEndpoint = baseEndpoint + 'activities'
let licenseEndpoint = baseEndpoint + 'license/'
let securityEndpoint = '/catalog/system/security/'
let datatypesEndpoint = '/catalog-editor/static/api/Datatypes.json'
let publishEndpoint = baseEndpoint + 'publish'

/* - - - - - - - - Dataset functions - - - - - - - - - - -  */
export function getDataset (query) {
  return dataset.get(query)
    .then(parse) // to JSON
    .then(itemItems) // Remove item or items JSON response ambiguity
    .then(arrSingletoObj) // If a single object in array remove array
    .then(forceArrPropKeyword) // Ensure attribute is always array
    .then(forceArrPropKeywords) // Ensure attribute is always array
    // .then(sortKeyword) // Sort keywords by prefLabel
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
    .then(reverse) // Simplify directorate object
}

export function saveDataset (query, pObj) {
  pObj = removeEmptyStrings(pObj)

  // Separate keyword tags from ids
  pObj.keywords = pObj.keyword.map((kword) => {
    return kword['@id']
  })

  // Separate keyword tags from ids
  pObj.keyword = pObj.keyword.map((kword) => {
    return kword['prefLabel']
  })

  if (query.id === 'new') {
    return dataset.save({}, JSON.stringify(pObj))
  } else {
    return dataset.update(query, JSON.stringify(pObj))
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
    .then(reverse) // Simplify directorate object
}

export function saveElement (query, pObj) {
  // Populate the temporal property from the date fields
  pObj.temporal = pObj.startDate + '/' + pObj.endDate

  pObj = removeEmptyStrings(pObj)

  if (query.eid === 'new') {
    delete query.eid
    return element.save(query, JSON.stringify(pObj))
  } else {
    return element.update(query, JSON.stringify(pObj))
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
    .then((d) => {
      return d.sort(dynamicSort('prefLabel'))
    })
}

export function saveKeyword (query, pObj) {
  return keyword.save({}, JSON.stringify(pObj))
}

/* - - - - - - - - User functions - - - - - - - - - - -  */
export function getLoggedInUser () {
  return Vue.http.get(securityEndpoint + 'user', {}).then(parse)
}

export function login (user) {
  user.rememberMe = true
  return Vue.http.post(securityEndpoint + 'login', user, {emulateJSON: true})
}

export function logout () {
  return Vue.http.post(securityEndpoint + 'logout')
}

/* - - - - - - - - Additional functions - - - - - - - - - - -  */
export function getDirectorates () {
  return Vue.http.get(directoratesEndpoint, {}).then(parse).then(itemItems)
}

export function getActivities () {
  return Vue.http.get(activitiesEndpoint, {}).then(parse).then(itemItems).then((dset) => {
    let iteree = function (curr, past) {
      if (curr.narrower) {
        for (let iter of curr.narrower) {
          let nPast = past.concat([curr.label])
          iteree(iter, nPast)
        }
      }
      curr.niceName = past.join('/') + '/' + curr.label
      if (past.length) {
        curr.niceName = '/' + curr.niceName
      }
      newData.push(curr)
    }

    let newData = []
    for (let k of dset) {
      iteree(k, [])
    }
    return newData.reverse() // Builds up path from small to big
  })
}

export function getLicences () {
  return Vue.http.get(licenseEndpoint, {}).then(parse).then(itemItems)
}

export function getDatatypes () {
  return Vue.http.get(datatypesEndpoint, {}).then(parse)
}

export function publish () {
  return Vue.http.post(publishEndpoint, {}).then(parse)
}

/* - - - - - - - Helper functions - - - - - - - - - */
// Returned data structure can be of either items or item
// Remove ambiguity
let itemItems = (jsn) => {
  return jsn.item ? jsn.item : jsn.items
}

// Remove empty strings from objects
let removeEmptyStrings = (pObj) => {
  for (let k in pObj) {
    // Need to drill down in to objects
    if (pObj[k] === 'object') {
      pObj[k] = removeEmptyStrings(pObj[k])
    }
    if (pObj[k] === '' || pObj[k] === null) {
      delete pObj[k]
    }
  }
  return pObj
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
  if (typeof jsn.directorate === 'object') {
    jsn.directorate = jsn.directorate['@id']
  }
  return jsn
}

// Simplify directorate property to allow simple comparison on select element
// @id is all that's needed to update
let removeRPeriod = (jsn) => {
  if (jsn.accrualPeriodicity) {
    jsn.accrualPeriodicity = jsn.accrualPeriodicity.substring(3, 10000)
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

// Sort function taken from http://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript
function dynamicSort (property) {
  var sortOrder = 1
  if (property[0] === '-') {
    sortOrder = -1
    property = property.substr(1)
  }
  return function (a, b) {
    var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0
    return result * sortOrder
  }
}

let forceArrPropKeywords = (jsn) => {
  return forceArrProp(jsn, 'keywords')
}

let forceArrPropKeyword = (jsn) => {
  return forceArrProp(jsn, 'keyword')
}
//
// let sortKeyword = (jsn) => {
//   if (jsn.keyword) {
//     jsn.keyword = jsn.keyword.sort(dynamicSort('prefLabel'))
//   }
//   return jsn
// }

let forceArrPropDistribution = (jsn) => {
  return forceArrProp(jsn, 'distribution')
}

let reverse = (arr) => {
  return arr.reverse()
}
