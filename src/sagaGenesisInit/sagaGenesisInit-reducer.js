export default function (state, {type, numConfirmationsRequired}) {
  if (typeof state === 'undefined') {
    state = {
      initialized: false,
      numConfirmationsRequired: 1
    }
  }

  switch (type) {
    case 'SG_UPDATE_SAGA_GENESIS_CONFIG':
      state = {
        ...state,
        numConfirmationsRequired
      }
      break
    case 'SG_SAGA_GENESIS_INITIALIZED':
      state = {
        ...state,
        initialized: true
      }
      break

    // no default
  }

  return state
}
