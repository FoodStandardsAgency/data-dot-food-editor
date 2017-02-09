import iso8601 from './iso8601'
export default function (d) {
  if (d) {
    let parsed = iso8601.Period.parseToString('P' + d)
    return 'Typically published every ' + (parsed || '...')
  }
}
