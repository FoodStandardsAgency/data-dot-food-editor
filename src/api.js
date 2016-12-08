import datasets from './od-report-october-assets.json'

export function getPost (id, cb) {
  // fake an API request
  setTimeout(() => {
    if (datasets[id]) {
      cb(null, datasets[id])
    } else {
      cb(new Error('Post not found.'))
    }
  }, 100)
}
