/* global alert */
export default function (...a) {
  if (console && console.log) {
    console.log.apply(undefined, a)
    alert('sorry, something went wrong')
  }
}
