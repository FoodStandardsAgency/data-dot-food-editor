/*
  Development API endpoint for mocked server interaction
*/

export function getDataset (v, id, cb) {
  var resource = v.$resource('/metadata-repository/catalogue/dataset{/id}')

  // during development strip id from url
  // TODO - use proper id
  id = decodeURIComponent(id)
  let cleanId = id.split('/').pop()
  resource.get({id: cleanId}).then(function (d) {
    d.json().then(function (resp) {
      return cb(null, resp.item)
    })
  }, function (e) {})
}

export function getElements (v, id, cb) {
  var resource = v.$resource('/metadata-repository/catalogue/dataset{/id}/element')
  // during development strip id from url
  // TODO - use proper id
  id = decodeURIComponent(id)
  let cleanId = id.split('/').pop()
  resource.get({id: cleanId}).then(function (d) {
    d.json().then(function (resp) {
      return cb(null, resp.items)
    })
  }, function (e) {})
}

export function getDirectorates (v, id, cb) {
  v.$http.get('/static/api/datasets.json', {}).then(function (d) {
    d.json().then(function (datasets) {
      for (let value in datasets) {
        if (datasets[value].notation === id) {
          return cb(null, datasets[value])
        }
      }
    })
  }, function (e) {})
}

export function getAll (v, cb) {
  v.$http.get('/metadata-repository/catalogue/dataset', {}).then(function (d) {
    d.json().then(function (d2) {
      cb(null, d2.items)
    })
  }, function (e) {})
}
