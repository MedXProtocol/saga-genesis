export default function (state, {type, call, response, error, calls}) {
  if (typeof state === 'undefined') {
    state = {}
  }

  switch (type) {
    case 'WEB3_STALE_CALLS':
      state = {...state}
      calls.forEach(call => {
        state[call.hash].stale = true
      })
      break

    case 'WEB3_CALL':
      state = {
        ...state,
        [call.hash]: {
          ...state[call.hash],
          inFlight: true,
          stale: false
        }
      }
      break

    case 'WEB3_CALL_RETURN':
      state = {
        ...state,
        [call.hash]: {
          ...state[call.hash],
          inFlight: false,
          response: response
        }
      }
      break

    case 'WEB3_CALL_ERROR':
      state = {
        ...state,
        [call.hash]: {
          ...state[call.hash],
          inFlight: false,
          error: error
        }
      }
      break

    case 'WEB3_CALL_CANCELLED':
      state = {
        ...state,
        [call.hash]: {
          ...state[call.hash],
          inFlight: false
        }
      }
      break

    // no default
  }

  return state
}
