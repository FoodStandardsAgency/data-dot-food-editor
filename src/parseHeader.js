export default function (headers) {
  try {
    let id
    if (headers.map.location && headers.map.location[0]) {
      id = headers.map.location[0].split('/').pop()
    }
    if (headers.map.Location && headers.map.Location[0]) {
      id = headers.map.Location[0].split('/').pop()
    }
    return id
  } catch (e) {
    return
  }
}
