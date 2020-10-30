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
import exampleActivities from './data/activities'
import exampleLicences from './data/licences'

module.exports = {
/* - - - - - - - - Dataset functions - - - - - - - - - - -  */
getDataset : () => {
  return Promise.resolve(exampleDataset)
},

getDatasets : () => {
  return Promise.resolve(exampleDatasets)
},

saveDataset : () => {
  return {}
},

removeDataset : () => {
  return {}
},

/* - - - - - - - - Element functions - - - - - - - - - - -  */
getElement : () => {
  return Promise.resolve(exampleElement)
},

getElements : () => {
  return Promise.resolve(exampleElements)
},

saveElement : () => {
  return {}
},

removeElement : () => {
  return {}
},

/* - - - - - - - - Keyword functions - - - - - - - - - - -  */
getKeywordsObjects : () => {
  return Promise.resolve(exampleKeywords)
},

saveKeyword : () => {
  return {}
},

/* - - - - - - - - Additional functions - - - - - - - - - - -  */
getDirectorates : () => {
  return Promise.resolve(exampleDirectorates)
},

getDatatypes : () => {
  return {}
},

getActivities : () => {
  return Promise.resolve(exampleActivities)
},

getLicences : () => {
  return Promise.resolve(exampleLicences)
}
}