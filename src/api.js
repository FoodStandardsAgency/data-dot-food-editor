/*
  Development API endpoint for mocked server interaction
*/
import datasets from './od-report-october-assets.json'

export function getPost (id, cb) {
  // fake an API request
  setTimeout(() => {
    for (let value in datasets) {
      if (datasets[value].notation === id) {
        return cb(null, datasets[value])
      }
    }
    cb(new Error('Post not found.'))
  }, 100)
}

export function getAll (cb) {
  // fake an API request
  setTimeout(() => {
    cb(null, datasets)
  }, 100)
}
