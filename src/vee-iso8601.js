import iso8601 from './iso8601'

export default {
  // eslint-disable-next-line no-unused-vars
  getMessage (field, args) { // will be added to default English messages.
    // Returns a message.
    return 'incorrect ISO8601 frequency. Every year is 1Y. Every 3 months is 3M. Every 14 days is 14D.'
  },
  // eslint-disable-next-line no-unused-vars
  validate (value, args) {
    let parsed = iso8601.Period.parseToTotalSeconds('P' + value)
    return !!parsed
    // Returns a Boolean or a Promise.
  }
}
