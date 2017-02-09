export default function (str, length) {
  if (str && str.length > length) {
    return str.substr(0, length) + '...'
  }
  return str
}
