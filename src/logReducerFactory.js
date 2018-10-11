export function logReducerFactory(mutateStateWithLog) {
  return function(state, { type, logs, log }) {
    if (typeof state === 'undefined') {
      state = {}
    }

    switch(type) {
      case 'PAST_LOGS':
        state = {...state}
        logs.forEach((log) => {
          mutateStateWithLog(state, log)
        })
        break

      case 'NEW_LOG':
        state = {...state}
        mutateStateWithLog(state, log)
        break

      //no default
    }

    return state
  }
}
