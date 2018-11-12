export default function (state, { type, transactionId, call, options, error, receipt, gasUsed, txHash, confirmationNumber, address }) {
  if (typeof state === 'undefined') {
    state = {}
  }

  switch (type) {
    case 'SG_START_TRANSACTION':
      state = {
        ...state,
        [transactionId]: {
          transactionId,
          call,
          options: options || {},
          address,
          inFlight: true
        }
      }
      break

    case 'SG_TRANSACTION_HASH':
      if (state[transactionId]) {
        state = {
          ...state,
          [transactionId]: {
            ...state[transactionId],
            inFlight: false,
            submitted: true,
            txHash
          }
        }
      }
      break

    case 'SG_TRANSACTION_RECEIPT':
      if (state[transactionId]) {
        state = {
          ...state,
          [transactionId]: {
            ...state[transactionId],
            inFlight: false,
            complete: true,
            receipt
          }
        }
      }
      break

    case 'SG_TRANSACTION_CONFIRMED':
      if (state[transactionId]) {
        state = {
          ...state,
          [transactionId]: {
            ...state[transactionId],
            confirmed: true,
            receipt
          }
        }
      }
      break

    case 'SG_TRANSACTION_CONFIRMATION':
      if (state[transactionId]) {
        state = {
          ...state,
          [transactionId]: {
            ...state[transactionId],
            confirmationNumber
          }
        }
      }
      break

    case 'SG_TRANSACTION_ERROR':
      if (state[transactionId]) {
        state = {
          ...state,
          [transactionId]: {
            ...state[transactionId],
            inFlight: false,
            complete: true,
            error,
            call,
            gasUsed
          }
        }
      }
      break

    case 'SG_CLEAR_TRANSACTIONS':
      state = {}
      break

    case 'SG_REMOVE_TRANSACTION':
      const copy = Object.assign({}, state)
      delete copy[transactionId]
      state = copy

      break

    // no default
  }

  return state
}
