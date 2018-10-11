export default function (state, { type, transactionId, call, options, error, receipt, gasUsed, txHash, confirmationNumber, address }) {
  if (typeof state === 'undefined') {
    state = {}
  }

  switch (type) {
    case 'SEND_TRANSACTION':
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

    case 'TRANSACTION_HASH':
      state = {
        ...state,
        [transactionId]: {
          ...state[transactionId],
          call,
          inFlight: false,
          submitted: true,
          txHash
        }
      }
      break

    case 'TRANSACTION_RECEIPT':
      state = {
        ...state,
        [transactionId]: {
          ...state[transactionId],
          inFlight: false,
          complete: true,
          receipt
        }
      }
      break

    case 'TRANSACTION_CONFIRMED':
      state = {
        ...state,
        [transactionId]: {
          ...state[transactionId],
          confirmed: true,
          receipt
        }
      }
      break

    case 'TRANSACTION_CONFIRMATION':
      state = {
        ...state,
        [transactionId]: {
          ...state[transactionId],
          confirmationNumber
        }
      }
      break

    case 'TRANSACTION_ERROR':
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
      break

    case 'SIGNED_OUT':
      state = {}
      break

    case 'REMOVE_TRANSACTION':
      const copy = Object.assign({}, state)
      delete copy[transactionId]
      state = copy

      break

    // no default
  }

  return state
}
