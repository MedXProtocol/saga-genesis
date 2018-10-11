export default function (state, { type, networkId }) {
  if (typeof state === 'undefined') {
    state = {
      networkId: undefined
    }
  }

  switch (type) {
    case 'WEB3_NETWORK_ID':
      // console.log('setting network id in state')
      state = {
        networkId
      }
      break

    // no default
  }

  return state
}
