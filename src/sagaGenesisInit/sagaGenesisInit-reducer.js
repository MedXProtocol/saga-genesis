export default function (state, {type}) {
  if (typeof state === 'undefined') {
    state = {
      initialized: false
    }
  }

  switch (type) {
    case 'SAGA_GENESIS_INITIALIZED':
      state = {
        ...state,
        initialized: true
      }
      break

    // no default
  }

  return state
}
