export default function (state, {type, balance}) {
  if (typeof state === 'undefined') {
    state = {
      balance: undefined
    }
  }

  switch (type) {
    case 'ETH_BALANCE':
      state = {
        balance
      }
      break

    // no default
  }

  return state
}
