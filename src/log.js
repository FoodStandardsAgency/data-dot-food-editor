/* global alert */
export default function (...a) {
  if (console && console.log) {
    console.log.apply(a)
    alert('sorry, something went wrong')
  }
}
