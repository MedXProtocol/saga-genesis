export default function (state, { type, address, logs, log }) {
  if (typeof state === 'undefined') {
    state = {}
  }

  switch (type) {
    case 'LOG_LISTENER_ADDED':
      if (!state[address]) {
        state = {
          ...state,
          [address]: {
            count: 1
          }
        }
      } else {
        state = {
          ...state,
          [address]: {
            ...state[address],
            count: (state[address].count + 1)
          }
        }
      }
      break

    case 'PAST_LOGS':
      state = {
        ...state,
        [address]: {
          ...state[address],
          logs
        }
      }
      break

    case 'NEW_LOG':
      state = {...state}
      state[address].logs.push(log)

      break

    case 'REMOVE_LOG_LISTENER':
      state = {...state}
      if (state[address]) {
        state[address].count -= 1
        if (state[address].count === 0) {
          delete state[address]
        }
      }
      break

    // no default
  }

  return state
}
