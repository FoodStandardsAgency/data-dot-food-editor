/* global alert */
import Raven from 'raven-js'
export default function (...a) {
  if (console && console.log) {
    console.log.apply(null, a)
    Raven.captureException(a)
    alert('sorry, something went wrong')
  }
}
