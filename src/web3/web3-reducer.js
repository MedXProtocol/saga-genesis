export default function (state, {type}) {
  if (typeof state === 'undefined') {
    state = {
      initialized: false,
      error: false
    }
  }

  switch (type) {
    case 'WEB3_INITIALIZED':
      state = {
        ...state,
        initialized: true
      }
      break

    case 'WEB3_INITIALIZE_ERROR':
      state = {
        ...state,
        error: true
      }
      break

    // no default
  }

  return state
}
