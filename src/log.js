/* global alert _LTracker */
export default function (...a) {
  if (console && console.log) {
    console.log.apply(null, a)
    _LTracker.push(a)
    alert('sorry, something went wrong')
  }
}
