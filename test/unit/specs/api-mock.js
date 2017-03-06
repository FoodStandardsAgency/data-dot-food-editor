/*
  Development API endpoint for mocked server interaction
*/

import exampleDataset from './data/dataset'
import exampleDatasets from './data/datasets'
import exampleElement from './data/element'
import exampleElements from './data/elements'
import exampleDirectorates from './data/directorates'
import exampleKeywords from './data/keywords'
// import exampleDatatypes from './data/datatypes'

/* - - - - - - - - Dataset functions - - - - - - - - - - -  */
export function getDataset (query) {
  return exampleDataset
}

export function getDatasets (query) {
  return exampleDatasets
}

export function saveDataset (query, pObj) {
  return {}
}

export function removeDataset (query) {
  return {}
}

/* - - - - - - - - Element functions - - - - - - - - - - -  */
export function getElement (query) {
  return exampleElement
}

export function getElements (query) {
  return exampleElements
}

export function saveElement (query, pObj) {
  return {}
}

export function removeElement (query) {
  return {}
}

/* - - - - - - - - Keyword functions - - - - - - - - - - -  */
export function getKeywordsObjects (query) {
  return exampleKeywords
}

export function saveKeyword (query, pObj) {
  return {}
}

/* - - - - - - - - Additional functions - - - - - - - - - - -  */
export function getDirectorates () {
  return exampleDirectorates
}

export function getDatatypes () {
  return {}
}
