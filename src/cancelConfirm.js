import 'bootstrap'
import bootbox from 'bootbox'

export default function (next) {
  bootbox.confirm({
    title: 'Unsaved changes',
    message: 'Are you sure you want to cancel?',
    backdrop: true,
    buttons: {
      confirm: {
        label: 'Yes'
      },
      cancel: {
        label: 'No'
      }
    },
    callback: function (result) {
      if (result) next()
    }
  })
}
